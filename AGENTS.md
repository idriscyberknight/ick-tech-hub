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
- Keep Sprint 01 routes static and informational without forms, persistence, or network submission handlers, so the foundation stays frontend-only.
