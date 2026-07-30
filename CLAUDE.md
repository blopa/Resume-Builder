# CLAUDE.md

**All project guidance for this repository lives in [AGENTS.md](AGENTS.md). Read it before making changes.**

It is the single source of truth for setup, commands, architecture, and conventions. This file exists only so Claude Code picks up that guidance automatically — keep instructions in `AGENTS.md` so every agent and tool shares one document, and don't duplicate them here.

## Quick reference

-   **Node 20.x** (`nvm use`) · `npm install` · `npm run start` → `http://localhost:8000`
-   Verify work with **`npm run build`**. There is no test suite — `npm test` intentionally exits 1.
-   Run **`npm run format`** before committing.
-   Line endings are **CRLF**. Writing LF produces whole-file diffs.
-   The store is **not Redux**, despite exporting `useSelector`/`useDispatch`.
-   Resume data has **two shapes** — plain JSON Resume and `{ enabled, value }` "toggleable". Know which one you're holding.

Details and the reasoning behind each of these are in [AGENTS.md](AGENTS.md).
