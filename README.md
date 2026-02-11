# Firebase Studio Next.js App

This project is already set up to run as a **single folder in VS Code** with **no required VS Code extensions**.

## Quick start (recommended)

1. Open VS Code.
2. Go to **File → Open Folder...** and select this project folder (`studio`).
3. Open a terminal in VS Code (**Terminal → New Terminal**).
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

6. Open your browser at:

   ```
   http://localhost:9002
   ```

That is all you need for local development.

---

## One-click run in VS Code (no extensions)

This repo includes built-in VS Code configuration files under `.vscode/`:

- **Task:** `Run Next.js dev server`
- **Task:** `Install dependencies`
- **Launch profile:** `Next.js: Chrome (localhost:9002)`

Use them like this:

1. Press **Ctrl+Shift+P** (or **Cmd+Shift+P** on macOS).
2. Run: `Tasks: Run Task` → choose **Run Next.js dev server**.
3. (Optional) open Run and Debug panel and start **Next.js: Chrome (localhost:9002)**.

No additional extension is required for these basic flows.

---

## Available scripts

- `npm run dev` — Start local development server on port `9002`.
- `npm run build` — Build production output.
- `npm run start` — Run production server.
- `npm run lint` — Run lint checks.
- `npm run typecheck` — Run TypeScript checks.
- `npm run genkit:dev` — Start Genkit in dev mode.
- `npm run genkit:watch` — Start Genkit in watch mode.

---

## Minimal troubleshooting

- If `npm run dev` fails, run:

  ```bash
  npm install
  ```

  again and retry.
- If port `9002` is busy, stop the conflicting process and rerun `npm run dev`.

---

## Project entry point

Main page starts at:

- `src/app/page.tsx`
