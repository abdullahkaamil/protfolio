# akaamil.com

Personal portfolio for **Abdullah Kaamil** — Full Stack Engineer & PHP Tech Lead.
Static site: plain HTML, CSS, and vanilla JS. No build step, no dependencies.

## Files
- `index.html` — all content (hero, about, experience, projects, skills, contact)
- `styles.css` — dark developer theme
- `script.js` — nav, role typewriter, scroll reveal, contact form

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
Everything is hand-written in `index.html` — update the timeline, projects, and stats
directly. Colors live in the `:root` block at the top of `styles.css`.
