# Amrutha Chappa Portfolio

## Run locally
```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```
## Edit content
All text, projects, skills and links live in `src/data.js`. Replace `#` links, set `formspree` (create a free form at formspree.io), put `resume.pdf` and `og-image.png` (1200x630) in `public/`, and replace `YOUR-DOMAIN.com` in `index.html`.

## Deploy on Vercel
1. Push to GitHub: `git init && git add . && git commit -m "init" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`
2. vercel.com > Add New > Project > import the repo. Framework: Vite (auto-detected), build `npm run build`, output `dist`. Click Deploy.
3. Custom domain: Project > Settings > Domains > Add. At your registrar add the DNS records Vercel shows (A record `76.76.21.21` for the root domain, CNAME `cname.vercel-dns.com` for `www`). HTTPS is automatic after DNS propagates.
4. Update the `og:url`/`og:image` tags with your final domain.
