<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Keep the existing TanStack Start/Vite routing foundation; do not replace the framework for this frontend sprint.
- Shared site chrome wraps one main element and the Outlet in the root route, so all content pages have consistent accessible navigation.
- Use services.tsx as an Outlet layout with services.index.tsx as its content leaf, so service detail pages render correctly.
- Keep corporate data and metadata helpers in a browser-safe shared module to avoid inconsistent content between pages.
- Keep corporate routes static and informational without forms, persistence, or network submission handlers until explicitly approved, so the foundation stays frontend-only.
- Reuse corporate values and intended approach sections across Home and About, with canonical statements in the shared content module, to keep approved content consistent.
- Keep consultation-detail and product-direction content in a separate browser-safe module with a reusable discovery section, so topic refinements leave approved Home/About wording unchanged.
- Scope corporate refinement styles beneath the existing page wrappers and reuse established site components, so unrelated routes and the inquiry preview retain their presentation and behavior.
