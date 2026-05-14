# 📁 Public Assets — Parth Patel Portfolio

This folder holds all static assets served directly by the web server.  
Files placed here are accessible at the **root URL** of the deployed site.

---

## Folder Structure

```
public/
├── images/
│   ├── profile/
│   │   └── parth.jpg              ← Profile photo (hero section)
│   └── projects/
│       └── (add project screenshots here)
│
├── documents/
│   ├── resume/
│   │   └── parth-patel-resume.pdf ← Resume (view online + download)
│   ├── certificates/
│   │   ├── cybersecurity-job-simulation.pdf ← Mastercard Forage cert (view only)
│   │   └── ssai-volunteer-certificate.pdf   ← SSAI Volunteer cert (view only)
│   └── diploma/
│       └── sdsu-diploma.pdf       ← SDSU Bachelor's diploma (view only)
│
├── favicon.svg
└── icons.svg
```

---

## How to Add New Assets

### ➕ New Certificate
1. Drop the PDF into `public/documents/certificates/`
2. Open `src/data/portfolioData.ts`
3. Add a new entry to the `certifications` array:
```ts
{
  name: 'Certificate Name',
  issuer: 'Issuer Organization',
  date: '2025',
  credentialUrl: '/documents/certificates/your-file.pdf',
}
```

### ➕ New Project Image
1. Drop the image into `public/images/projects/`
2. Reference it in `portfolioData.ts` under the relevant project:
```ts
image: '/images/projects/your-project.png'
```

### ➕ Updated Resume
1. Replace `public/documents/resume/parth-patel-resume.pdf` with the new file (keep the same filename)
2. No code changes needed — the site will automatically serve the new version

---

## View vs Download Policy

| Asset | Behavior |
|-------|----------|
| Resume | **View online** (opens in browser tab) **+** **Download** button |
| Certificates | **View online only** (opens in browser, no download button) |
| Diploma | **View online only** (opens in browser, no download button) |

---

## Deploying to GitHub Pages

```bash
# Build the site
npm run build

# The built output is in /dist
# Push to GitHub and set GitHub Pages source to /dist or use GitHub Actions
git add .
git commit -m "Update portfolio assets"
git push origin main
```
