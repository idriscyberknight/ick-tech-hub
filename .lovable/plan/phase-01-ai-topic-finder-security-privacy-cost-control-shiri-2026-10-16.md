# Phase 01 — AI Topic Finder: Security, Privacy & Cost Control (shirin karantawa kawai)

## A. Takaitawa (Executive summary)
AI Topic Finder yana aiki a preview, amma **bai shirya fita ga jama'a ba**. Matsaloli guda uku masu muhimmanci:
1. **Privacy notice ba daidai ba ne**: rubutun "not saved or sent to ICK Technologies" yana boye cewa rubutun baƙo yana tafiya zuwa **Lovable AI Gateway** sannan zuwa **model provider (OpenAI)**. `store: false` baya tabbatar da zero retention.
2. **Rate limit mai rauni**: in-memory `Map` a kan IP daga header da za a iya karya (`x-forwarded-for`), kuma ana sake farawa a kowane Worker instance — ba shi da tasiri a matsayin kariyar kuɗi.
3. **Babu iyakar kuɗi (budget cap)**: babu `maxOutputTokens`, babu kill switch, babu global/monthly ceiling, babu bot protection.
Shawara: **Zabin 1 (dakatar da kiran AI)** kafin publish; Zabin 2 idan Founder yana son preview mai tsauri.

## B. Evidence ledger
**VERIFIED (daga code):**
- HEAD = `e632e8c62fd145b7f17e835775bce08e86410c44` (checkout ya dace). Babu fayilolin admin/Supabase/founder a wannan checkout.
- `topic-advisor.tsx:40` — rubutun "Your text is not saved or sent to ICK Technologies".
- `topic-advisor.functions.ts:5` — `createRateLimiter()` a module scope (per-isolate memory).
- `topic-advisor.functions.ts:14` — key = `cf-connecting-ip ?? x-forwarded-for[0] ?? 'unknown'`; duk baƙi marasa header suna raba bucket ɗaya "unknown".
- `topic-advisor.ts:32` — idan `hits.size > 5000` ana `clear()` dukka → mai kai hari zai iya share limit na kowa ta hanyar juya keys.
- `topic-advisor.server.ts:32-40` — `openai/gpt-6-astra`, `responses()`, `Output.object(zod)`, `maxRetries: 0`, `reasoningEffort: 'low'`; **babu** `maxOutputTokens`, babu `abortSignal`, babu kill switch.
- `topic-advisor.server.ts:44` — log yana rubuta status kawai (ba rubutun baƙo ba). Kyakkyawa.
- Error paths: 429/402/403/other → saƙonni masu aminci; `LOVABLE_API_KEY` babu → "not configured" (fail-closed).
- `start.ts` — `createCsrfMiddleware` don server functions (yana taimakawa kan cross-site POST, amma ba bot ba).
- Rendering: duk fitarwar model a matsayin React text nodes; babu `dangerouslySetInnerHTML`; links daga map na topic ids kawai → haɗarin XSS ƙarami.
- `normalizeAdvisorResult` yana tace topic ids, yana yanke tsawo (reason/note 400, question 300, max 5).
- `privacy.tsx` yana cewa "no inquiry submission" kuma bai ambaci AI processing ba — **bai dace da gaskiya ba yanzu**. `terms.tsx` bai ambaci AI ba.
- Packages: `ai ^7.0.137`, `@ai-sdk/openai ^4.0.93`, `zod ^3.25.76`, `@tanstack/react-start 1.168.60`.

**REPORTED BUT NOT TESTED:** an gwada sau ɗaya a 390px (summary na baya); PR #2 yana buɗe a wani branch.
**UNKNOWN:** retention/logging na AI Gateway da provider; ko ana amfani da bayanai don training; ainihin farashin kowane request; ko Cloudflare yana saita `cf-connecting-ip` koyaushe a hosting na ƙarshe; fayilolin da PR #2 ya canza (ba a cikin wannan checkout ba).

## C. Threat model & data flow
```text
Browser textarea -> POST server fn (CSRF check) -> validator (20-1200 chars)
 -> in-memory IP limiter -> AI SDK -> Lovable AI Gateway (request logs, payload may be retained)
 -> OpenAI model -> structured JSON -> normalize -> React text
```
Barazana: header spoofing / IP rotation (cost abuse), bot loops, prompt injection (an rage ta schema + topic enum), PII da baƙi suka rubuta zuwa ɓangare na uku, gateway request-log retention, abubuwan model da ba su dace ba (ana nuna su azaman text).
Gwaje-gwaje da ake buƙata: spoofed `x-forwarded-for` rotation; missing-header bucket; 5000-key flush; kill switch fail-closed; output cap ya bayyana a request; browser test na consent checkbox da keyboard/mobile.

## D. Risk register
| # | Haɗari | Severity | Likelihood | Sakamako | Shawara |
|---|---|---|---|---|---|
| 1 | Privacy copy mara cikakke | High | Certain | Amana/doka (NDPA/GDPR) | Gyara copy + consent checkbox + privacy draft |
| 2 | Limiter mai karya/rarrabe | High | High bayan publish | Kuɗin credits | Kill switch + global cap; Turnstile kafin launch |
| 3 | Babu output/budget cap | High | Medium | Kuɗi mara iyaka | `maxOutputTokens`, workspace AI spend limit |
| 4 | Map flush a 5000 keys | Medium | Medium | Bypass limit | Evict mafi tsufa, ba clear ba |
| 5 | "unknown" bucket ɗaya | Medium | Medium | DoS ga baƙi na gaskiya | Fail-closed idan babu trusted IP a production |
| 6 | Privacy/terms ba su ambaci AI | Medium | Certain | Rashin gaskiya | Draft sashe (ba legal approval ba) |
| 7 | Prompt injection | Low | Medium | Fitarwa marar dacewa | An rage ta schema/enum; ci gaba |
| 8 | XSS | Low | Low | — | Kiyaye text rendering |

## E. Zabuka biyu
| | Zabi 1: Dakatar | Zabi 2: Harden + opt-in preview |
|---|---|---|
| Kuɗin credits | Sifili | Ƙarami, amma yana gudana |
| Aiki | Ƙarami | Matsakaici (Turnstile, kulawa) |
| Reversibility | Sauƙi (flag guda) | Sauƙi |
| UX | Saƙon "coming soon" + static topic guide | AI na aiki bayan consent |

## F. Mafi ƙanƙantar shirin Phase 01 (bayan amincewa)
**Phase 01a — Kill switch (fail-closed):** `src/lib/topic-advisor.ts` — `ADVISOR_ENABLED` (server env `TOPIC_ADVISOR_ENABLED === 'true'`, default off). `topic-advisor.functions.ts` yana dawowa "temporarily paused" ba tare da kiran gateway ba. UI yana nuna static fallback (links zuwa topics uku).
**Phase 01b — Privacy honesty:** gyara copy a `topic-advisor.tsx` (rubutun yana zuwa Lovable AI Gateway da AI provider; ICK baya ajiyewa; retention na ɓangare na uku ba a tabbatar ba); required consent checkbox; draft sashen AI a `privacy.tsx` da `terms.tsx` mai lakabin "pending legal review".
**Phase 01c — Cost guards (Zabi 2 kawai):** `maxOutputTokens` (misali 600) a `topic-advisor.server.ts`; amfani da `cf-connecting-ip` kawai (kada a amince da `x-forwarded-for`); fail-closed idan babu; LRU eviction maimakon clear; global per-isolate cap; propagate client abort (499).
**Phase 01d — Kafin publish (approval daban):** Cloudflare Turnstile (secret key), workspace AI spend limit, centralized rate limit (KV/DB — **yana buƙatar amincewa daban, ba DB a yanzu**).
**Tests:** unit — kill switch off ba ya kira server module; limiter eviction; spoofed XFF ignored; consent required. Browser — consent + keyboard + 390px. Babu gwajin gateway na gaske sai da izini.
**Fayiloli:** `topic-advisor.ts`, `topic-advisor.functions.ts`, `topic-advisor.server.ts`, `topic-advisor.tsx`, `privacy.tsx`, `terms.tsx`, `src/test/topic-advisor.test.ts`, `AGENTS.md`. **Babu** ɗaya daga cikin fayilolin PR #2 da aka lissafa (admin-auth, founder-*, supabase-*, migrations) — babu karo da aka gani a wannan checkout, amma ba a iya duba diff na PR #2 ba.
**Acceptance kafin launch:** kill switch an tabbatar; copy na gaskiya; consent; output cap; Turnstile; spend limit; legal review na privacy/terms; dukkan tests sun wuce.

## G. Shawara ga Founder
Ka amince da **Phase 01a + 01b yanzu** (Zabi 1: AI a kashe ta default). Kuɗi: babu credits sai an kunna; kowane kira idan an kunna yana amfani da workspace AI credits. Hukunce-hukunce da ake buƙata: (1) Zabi 1 ko 2; (2) amincewa da sabon copy/consent; (3) daga baya — Turnstile, spend limit, da centralized limiter.

## H. Bayani na gaskiya
NO CODE CHANGED, NO DATABASE CHANGED, NO GITHUB BRANCH CHANGED, NO AI GENERATION REQUEST MADE, NO PUBLISH/DEPLOY. Ana jiran amincewar Founder kafin kowane aiki.
