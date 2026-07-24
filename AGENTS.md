# AGENTS.md

Guidance for AI coding agents working in this repository. Human-facing docs live in [README.MD](README.MD).

## Project Overview

Resume Builder is a **Gatsby 3 static site** (React 17 + Material UI 4) that turns resume data into printable resumes. It is deployed to GitHub Pages at [resume-builder.js.org](https://resume-builder.js.org/).

**There is no backend.** Spreadsheets, `.json` uploads, and GitHub-hosted resumes are all fetched and parsed in the browser. Never introduce a server-side dependency, an API key, or anything that assumes a running server.

## Setup & Commands

Requires Node **20.x** (see `.nvmrc`; run `nvm use`).

| Command          | Purpose                                                                  |
| ---------------- | ------------------------------------------------------------------------ |
| `npm install`    | Install dependencies.                                                    |
| `npm run start`  | Dev server at `http://localhost:8000` (alias for `develop`).             |
| `npm run build`  | Production build into `public/`.                                         |
| `npm run serve`  | Serve the production build.                                              |
| `npm run clean`  | Clear `.cache/` and `public/` — do this first when Gatsby behaves oddly. |
| `npm run format` | Prettier over the codebase. Run before committing.                       |

**There is no test suite.** `npm test` is a placeholder that prints a message and exits 1 — this is expected, not a broken build. Do not report it as a failure, and do not "fix" it by making it exit 0. If you add real tests, wire up the runner properly.

**There is no standalone lint script.** ESLint runs automatically via `gatsby-plugin-eslint` during `develop`/`build`. To lint directly: `npx eslint src --ext .js,.jsx`.

## Critical Conventions

### Line endings are CRLF

`.gitattributes` forces `eol=crlf` for `*.js`, `*.jsx`, `*.json`, `*.md`, and `.prettierrc` sets `"endOfLine": "crlf"`. Writing LF files will produce whole-file diffs that bury the actual change. If you touch a file and the diff shows every line changed, this is why — run `npm run format` and re-check.

### Code style

Enforced by Prettier (`.prettierrc`) — 4-space indent, single quotes, semicolons, 120-char width, `trailingComma: "es5"`, arrow parens always.

-   Components are **arrow functions** with a `default export`, one per file.
-   Files containing JSX use the **`.jsx`** extension. Plain logic uses `.js`. `src/pages/index.js` exists purely as a Gatsby entry point that re-exports `Home.jsx` — don't put JSX in it.
-   `react/prop-types` is a **warning**, not an error. Adding PropTypes to components you touch is welcome (it's on the roadmap), but don't do a repo-wide migration unless asked.
-   ESLint extends `sonarjs`, `jsx-a11y`, `react-hooks`, and `import` recommended sets. Most rules are warnings; keep new warnings at zero.

## Architecture

### The store is NOT Redux

`src/store/StoreProvider.jsx` is a hand-rolled Context + `useReducer` store that **deliberately mimics the Redux API**:

```js
import { useDispatch, useSelector } from '../store/StoreProvider';
import { selectToggleableJsonResume } from '../store/selectors';
```

`react-redux` is not a dependency. Do not import from it, do not reach for Redux middleware, and do not suggest Redux DevTools wiring as a drop-in (it's a roadmap item requiring real work).

Actions are plain factory functions in `src/store/actions/`, one per file, default-exported. Note they do **not** use a `payload` key — the value is attached under a domain-named key that the reducer reads directly:

```js
const setResumeWork = (work) => ({ type: 'SET_RESUME_WORK', work });
// reducer reads action.work — not action.payload
```

The reducer is a single `switch` in `src/store/reducer/index.js`. To add state: create the action file, add the case to the reducer, add a selector to `selectors.js`.

### The "toggleable" data model

This is the single most important concept in the codebase. Resume data exists in **two shapes**:

1. **Plain JSON Resume** — standard [jsonresume schema](https://github.com/jsonresume/resume-schema) v1.0.0. What users upload and download.
2. **Toggleable** — every field wrapped as `{ enabled: boolean, value: any }`, recursively. This is what lives in the store and drives the sidebar checkboxes that let users hide individual entries.

```jsonc
// plain                    // toggleable
{ "work": [...] }    <->    { "work": { "enabled": true, "value": [...] } }
```

Conversion happens in `src/utils/utils.js`:

-   `convertToToggleableObject(obj, ignoredProperties)` — on import.
-   `convertToRegularObject(obj, ignoredProperties)` — on render/download; disabled fields collapse to an empty default.

Both take an `ignoredProperties` list of keys that stay unwrapped (`coverLetter`, `__translation__`, `enableSourceDataDownload`, `meta`, `$schema`). The two functions have **different defaults** — check which you need.

⚠️ Both functions **mutate their argument in place** (there are `TODO`s about this). Callers pass `cloneDeep(...)`. Preserve that, or you will corrupt the store.

### Data flow

```
Upload.jsx  ──> spreadsheet-parser.js ──> spreadsheet-to-json-resume.js ─┐
(sheet URL / file)                                                       │
Upload.jsx  ──> json-parser.js ─────────────────────────────────────────┤
(.json file)                                                             ├──> convertToToggleableObject
Build.jsx   ──> form values ────────────────────────────────────────────┤        │
(from scratch)                                                           │        v
ResumeViewer.jsx ──> fetchGithubResumeJson() ───────────────────────────┘   store (toggleableJsonResume)
                                                                                  │
                                              Resume.jsx: convertToRegularObject + parseMarkdown
                                                                                  │
                                                                                  v
                                                              ResumeTemplates/<Name>/Index.jsx
```

### Templates

Each template is a folder in `src/components/ResumeTemplates/` containing `Index.jsx`, `Sections/`, and `intl/`. Templates receive a **plain** (already converted, already markdown-parsed) `jsonResume` prop.

`gatsby-node.js` reads that directory at build time and generates a `/view/<template>` route per template, minus the `disabledTemplates` array at [gatsby-node.js:6](gatsby-node.js#L6) — currently empty, so all three templates (`Default`, `VanHack`, `Compact`) ship. That same array is injected into the client as the `TEMPLATES_LIST` webpack global. **A new template folder is picked up automatically; an incomplete one must be added to `disabledTemplates`.**

### Markdown & sanitization

Markdown is parsed **once, centrally** in `parseMarkdown()` in [Resume.jsx:55](src/pages/Resume.jsx#L55), and only for these keys: `description`, `summary`, `reference`, `coverLetter`. The order is always **`DOMPurify.sanitize()` first, then `marked()`**.

Templates then render the result with `dangerouslySetInnerHTML`. That is safe _only_ because sanitization already happened upstream. If you add a markdown-enabled field, add its key to that array in `parseMarkdown` — never call `marked()` inside a template, and never render unsanitized user content.

### Internationalization

Seven locales: `en`, `pt-br`, `es`, `ja`, `de`, `ru`, `fr` (registered in `gatsby-config.plugins.js`). Uses `gatsby-plugin-react-intl`, which prefixes routes with the locale.

Translations are **two-layered**: global UI strings in `src/intl/<locale>.json`, merged with per-template strings in `ResumeTemplates/<Name>/intl/<locale>.json` (local wins). Each template's `intl/index.js` imports all locales explicitly and builds `createIntl` instances.

Adding a locale means touching: `gatsby-config.plugins.js`, `src/intl/`, **and** every template's `intl/` folder plus its `index.js` import list. Adding a key means adding it to all seven files in that layer.

Separately, `__translation__` in a user's resume overrides section headings at **runtime** — that is user data, unrelated to the files above.

### Gatsby gotchas

-   **SSR:** `window`/`localStorage` are undefined at build time. Guard with `isClient()` from `src/utils/utils.js`.
-   **Routing:** `onCreatePage` in `gatsby-node.js` deletes and recreates every page with a kebab-cased path, so `src/pages/Build.jsx` → `/build`. `Home.jsx` is excluded (it's served at `/` via `index.js`). `/build` and `/view/*` register wildcard `matchPath`s for client-side routes.
-   Never commit `public/` or `.cache/` — both are gitignored build output.

## Known Discrepancies

-   **Spreadsheet field names drift from the schema.** The example sheet labels the avatar `picture` and the website `website`; the JSON Resume schema and all templates use `image` and `url`. The converter normalises these via the `basicsFieldAliases` map in `spreadsheetToJsonResume`. If a value entered in a spreadsheet silently never renders, check whether its `TYPE` matches the schema key the template destructures — and add an alias rather than renaming the template field, so existing user spreadsheets keep working.
-   `content/json_example.json` is stale v0.x-era sample data (uses `website`, has no `image`, lacks `projects`/`certificates`). Nothing imports it — don't treat it as a reference for the current schema. Use `resume.json` at the repo root instead.
-   Google Sheets must be **published to the web**, not merely link-shared. Most "spreadsheet won't load" reports are this.

## Pull Requests

-   Branch from `main`, keep commits focused, run `npm run format` before committing.
-   Verify with `npm run build` — that is the closest thing to CI for correctness right now.
-   Pushes to `main` auto-deploy to GitHub Pages via `.github/workflows/deploy-to-gh-pages.yml`. Treat `main` as production.
-   Update [README.MD](README.MD) when you change user-facing behavior, supported formats, or locales.
