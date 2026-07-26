# AURA INTERIORS — Static Website Template

A premium, reusable, static website template for interior design studios.
Built with plain **HTML + CSS + vanilla JavaScript** — no build step, no
backend, no paid services. Deploys to **GitHub Pages** (or any static host)
in minutes.

> Everything a client-facing site needs — brand, contact, services, projects,
> testimonials, before/after, process, and a lead form with mailto + WhatsApp
> fallbacks — driven from a single editable data file.

---

## 1. What is this?

A master template you can reuse for many interior designers. All the copy,
images, colors, contact details, services, projects and testimonials live in
**one file** (`data/site-data.js`). Change that file → the whole site updates.

**Pages**
- `index.html` — home (hero, stats, about, services, projects, before/after, process, testimonials, CTA)
- `about.html` — studio story, stats, process, testimonials
- `services.html` — services grid + process
- `projects.html` — full portfolio + before/after (click a card for a project detail modal with gallery, concept, materials)
- `contact.html` — contact info, Google Map, contact form (mailto + WhatsApp)

---

## 2. Run it locally

No build step. Just open the site.

**Option A — double-click:** open `index.html` in your browser.

**Option B — tiny local server (recommended, avoids browser file:// quirks):**

```bash
# Python 3
python3 -m http.server 8080

# or Node
npx serve .
```

Then visit `http://localhost:8080`.

---

## 3. Customize for a new client

Open **`data/site-data.js`**. Everything is grouped and clearly labelled.
Edit values, save, refresh the browser.

### Business info
Update `brand`, `contact` and `footer` blocks:

```js
brand: {
  name: "STUDIO NAME",
  logoText: "STUDIO",
  logoAccent: "INTERIORS",
  tagline: "Your tagline here.",
  city: "Your City, Country",
},
contact: {
  phone: "+91 90000 00000",
  whatsapp: "919000000000",   // digits only, incl. country code, no + or spaces
  email: "hello@yourdomain.com",
  address: "Full studio address",
  hours: "Mon – Sat · 10:00 – 19:00",
  mapsUrl:   "https://www.google.com/maps?q=Your+Address",
  mapsEmbed: "https://www.google.com/maps?q=Your+Address&output=embed",
  instagram: "https://instagram.com/yourhandle",
},
```

### WhatsApp number
Set `contact.whatsapp` to **digits only, including country code** (no `+`, no
spaces). Example for India: `"919820000000"`. The floating WhatsApp button,
the contact page, and the "Send via WhatsApp" form action all use this value.

### Google Maps link
- `contact.mapsUrl` — where the "Open in Google Maps" link points.
- `contact.mapsEmbed` — used inside the embedded iframe map on the contact
  page. Easiest way to get one: search your address on Google Maps → **Share
  → Embed a map → Copy the `src` URL** from the iframe.

### Business hours, address, phone, email, Instagram
All live under the `contact` block above.

### Services
Edit the `services` array. Add / remove / reorder cards. Each item:

```js
{
  name: "Service Name",
  description: "One-sentence description.",
  image: "https://…/photo.jpg",
}
```

### Projects
Edit the `projects` array. Each project supports a full detail view:

```js
{
  slug: "unique-slug",
  name: "Project Name",
  location: "Neighbourhood, City",
  category: "Residential",
  cover: "https://…/cover.jpg",
  description: "Short overview.",
  concept: "Design story.",
  materials: ["Oak", "Travertine", "Brass"],
  gallery: [
    "https://…/1.jpg",
    "https://…/2.jpg",
  ],
},
```

### Testimonials
Edit the `testimonials` array — quote, name, project type, location.

### Statistics
Edit the `stats` array — value + label pairs.

### Hero, About, Before/After, Lead CTA, Process
All editable under their matching keys in `data/site-data.js`.

---

## 4. Replace images

The template uses free Unsplash URLs so it looks polished out of the box.
For a real client:

1. Put your JPGs / PNGs into `assets/images/` (create sub-folders if you
   like, e.g. `assets/images/projects/`).
2. In `data/site-data.js`, replace the `https://…` URL with a relative path:

   ```js
   image: "assets/images/hero.jpg",
   cover: "assets/images/projects/modern-residence-cover.jpg",
   gallery: [
     "assets/images/projects/modern-residence-1.jpg",
     "assets/images/projects/modern-residence-2.jpg",
   ],
   ```

Recommended sizes: hero ≥ 1920 px wide, project covers ~1400 px wide,
gallery images ~1400 px wide. Compress with [Squoosh](https://squoosh.app)
or [TinyPNG](https://tinypng.com) before uploading.

---

## 5. Change colors

Open **`css/style.css`**. The very top has a `:root` block:

```css
:root {
  --cream: #f6f1ea;
  --ink:   #1c1a17;
  --muted: #6b655d;
  --border: #e4ddd1;
  --accent: #a8845c;      /* muted brass */
  --accent-2: #7a5a3a;
  --bg: #fbf8f3;
}
```

Change these hex values → whole site rethemes. Keep good contrast between
`--ink` (text) and `--bg` / `--cream` (backgrounds).

Fonts are loaded from Google Fonts in each HTML file's `<head>`. Swap the
`<link>` tag and update `--font-display` / `--font-sans` in the CSS to
rebrand typography.

---

## 6. Contact form — how it works, and how to connect a real service

Because this is a fully static site (no backend), the contact form uses two
zero-cost fallbacks that work out of the box:

- **Send Enquiry** — opens the user's email app with the enquiry pre-filled
  (`mailto:` to your address).
- **Send via WhatsApp** — opens WhatsApp with the enquiry pre-filled to your
  business number.

### Optional: connect a real form service later

If you want form submissions delivered to your inbox without the user's mail
app opening, plug in a free service such as
[**Formspree**](https://formspree.io), [**Getform**](https://getform.io) or
[**Basin**](https://usebasin.com). Steps for Formspree:

1. Create a free Formspree account and a new form. Copy the endpoint URL,
   e.g. `https://formspree.io/f/abcdwxyz`.
2. Open `js/script.js`, find the `renderContact()` function, and replace the
   form's submit handler so it POSTs to that URL:

   ```js
   form.addEventListener("submit", async (e) => {
     e.preventDefault();
     if (!form.reportValidity()) return;
     const res = await fetch("https://formspree.io/f/abcdwxyz", {
       method: "POST",
       headers: { Accept: "application/json" },
       body: new FormData(form),
     });
     if (res.ok) { form.reset(); alert("Thanks — we'll be in touch soon."); }
     else { alert("Something went wrong. Please try WhatsApp or email."); }
   });
   ```

Keep the "Send via WhatsApp" button as a fallback — it converts really well
on mobile.

---

## 7. Upload to GitHub

1. Create a free account at [github.com](https://github.com) if you don't
   have one.
2. Click **New repository**. Name it e.g. `aura-interiors-site`. Keep it
   **Public** (required for free GitHub Pages).
3. On your computer, from inside this project folder:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/aura-interiors-site.git
   git push -u origin main
   ```

Or use **GitHub Desktop** — drag the folder in, publish repository.

---

## 8. Activate GitHub Pages

1. In your repository on GitHub → **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Pick branch **`main`** and folder **`/ (root)`**. Save.
4. Wait ~1 minute. Your site is live at:
   `https://YOUR-USERNAME.github.io/aura-interiors-site/`

Every `git push` to `main` auto-redeploys.

> **Note on paths:** every asset in this template uses **relative** paths
> (`css/style.css`, `data/site-data.js`, `assets/images/…`) so it works both
> at the root of a domain **and** inside a project subfolder like
> `/aura-interiors-site/`. Don't change relative paths to absolute (`/css/…`)
> unless you're hosting at a root domain.

---

## 9. Connect a custom domain

1. Buy a domain from any registrar (Namecheap, Google Domains, GoDaddy, etc.).
2. In your registrar's DNS settings, add these records:
   - Four `A` records for the apex (`example.com`) pointing to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `CNAME` record for `www` pointing to `YOUR-USERNAME.github.io`.
3. In your GitHub repo → **Settings → Pages → Custom domain** → enter
   `example.com` and save. Tick **Enforce HTTPS** once it becomes available
   (usually within an hour).
4. GitHub creates a `CNAME` file in your repo automatically — commit it if
   prompted.

That's it. Your site is now live at your own domain.

---

## 10. File structure

```
/
├── index.html
├── about.html
├── services.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── data/
│   └── site-data.js         ← ALL editable content lives here
├── assets/
│   ├── images/              ← put your photos here
│   └── icons/
├── README.md
└── .gitignore
```

---

## License

Template is yours to use and modify for client projects. Replace the demo
Unsplash photography with images you have the rights to before shipping to a
real client.
