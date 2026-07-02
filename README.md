# akaamil.com

Personal portfolio for **Abdullah Kaamil**, Full Stack Engineer & PHP Tech Lead.
Static site: plain HTML, CSS, and vanilla JS. No build step, no dependencies.

## Files
- `index.html`: all content (hero, about, experience, projects, skills, contact) + JSON-LD structured data
- `styles.css`: dark + light theme
- `script.js`: nav, theme toggle, role typewriter, scroll reveal, scroll-spy, scroll progress, contact form
- `assets/`: avatar, CV PDF, OG share image, optional project screenshots

## Assets you can swap
- `assets/avatar.jpg` — hero photo (square, ~500×500)
- `assets/Abdullah-Kaamil-CV.pdf` — file behind the "Download CV" button
- `assets/og-image.png` — 1200×630 social share image (regenerate with `scripts`/Pillow if details change)
- **Project screenshots (optional):** drop `assets/proj-health.png` and `assets/proj-komsum.png`
  (recommend ~800×500, top-aligned). They automatically replace the gradient placeholders on the
  cards; if a file is missing, the branded gradient thumbnail shows instead.

## Theme
Dark by default. A toggle in the nav switches to light and the choice is saved to `localStorage`.
An inline script in `<head>` applies the saved/system theme before paint to avoid a flash.

## Run locally
```bash
python3 -m http.server 4173
# open http://localhost:4173
```

## Contact form
The form currently falls back to opening the visitor's email client (`mailto:`).
To make it submit directly:
1. Create a free form at https://formspree.io (or similar) using `akaamil@outlook.com`.
2. In `index.html`, replace `your-form-id` in the form `action` with your Formspree ID.
   `script.js` auto-detects the real endpoint and switches to AJAX submission.

## Deploy
Drag the folder to **Netlify** / **Vercel**, push to **GitHub Pages**, or upload to any
static host. Point `akaamil.com` DNS at the host and you're live.

## Editing content
Everything is hand-written in `index.html`. Update the timeline, projects, and stats
directly. Colors live in the `:root` block at the top of `styles.css`.
