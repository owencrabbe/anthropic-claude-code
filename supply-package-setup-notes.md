# Supply Package — Systeme.io Setup Notes

## Files delivered

- `supply-package-full-page.html` — Complete standalone HTML file with `<html>`, `<head>`, `<body>` tags. Host anywhere (GitHub Pages, Netlify, Cloudflare Pages, etc.)
- `supply-package-systemeio-block.html` — Same page stripped of outer tags, ready to paste into a Systeme.io Custom HTML block.

---

## How to embed in Systeme.io

- **Option A — One block:** In your Systeme.io funnel page editor, add a single "Custom HTML / Code" block and paste the entire contents of `supply-package-systemeio-block.html` into it. This is the simplest approach and keeps everything in one place.

- **Option B — Section by section:** Add one Custom HTML block per page section if you want Systeme.io's native section controls (padding, background). Copy each `<section>` element individually. Make sure to include the `<style>` block and font `<link>` tags in the first block only.

- **Set the page background:** In Systeme.io's page settings, set the page background color to `#0a0a0a` so there's no white flash around the block edges.

- **Replace the form placeholder:** Find the comment markers `[SYSTEME_IO_FORM_EMBED]` in the file. Delete everything between those comment blocks (the `.oc-form-shell` div and its children) and paste your Systeme.io opt-in form embed code in its place. Your Systeme.io form embed is found under Funnels → your funnel → opt-in step → "Share" or "Embed" code.

- **Disable Systeme.io's default page styles:** In the funnel page settings, look for a "Custom CSS" or "Advanced" tab and add `body { background: #0a0a0a !important; }` to suppress any white background the platform might inject.

- **Mobile preview:** After pasting, use Systeme.io's mobile preview toggle to confirm the responsive breakpoint at 600px is working. The page uses only native CSS media queries — no framework required.

- **Telegram link:** The community button already points to `https://t.me/+MGt-gfPvWSg3MTVh`. No changes needed unless the link changes.

- **Domain:** If hosting the full page version as a standalone file, point `owencrabbe.com` (or a subdomain like `go.owencrabbe.com`) at the hosted file via your DNS / hosting provider.
