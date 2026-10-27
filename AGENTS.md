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

## Architecture rules
- All data access goes through `src/services/launcher.ts` (mock today) and `src/services/queries.ts`; UI never fetches directly — so a real backend can be swapped in without touching components.
- Desktop shell actions (play, verify, window controls) go through `launcherBridge` — keeps the UI host-agnostic.
- Launcher chrome (sidebar, top bar) lives in `__root.tsx`; each nav section is its own route file.
