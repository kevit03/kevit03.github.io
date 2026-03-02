# Kevin Tang — Portfolio Site

- Add/edit/reorder project cards (with GitHub + optional demo links)
- Search + sort projects
- Upload **JPEGs** to a local gallery (images are resized/compressed and stored in your browser)
- Export/import a JSON backup (recommended, since browser storage is limited)

## Run locally

Open `index.html` directly, or (recommended) serve it locally:

```bash
cd kevin-tang-portfolio
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

## Host on GitHub Pages (free)

1. Create a new GitHub repo, e.g. `kevin-tang-portfolio`
2. Copy this folder’s contents into the repo (at the repo root)
3. Push to GitHub
4. In GitHub: **Settings → Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Your site will be published at a URL like:
   - `https://<your-username>.github.io/kevin-tang-portfolio/`

## Notes

- The project/gallery data is stored in **localStorage** (per browser + per device).
- Use **Export** to back up and **Import** to restore/move your data.

