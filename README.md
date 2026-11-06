# Pipedrive Class of 2026 — sign-up site

A single-page site (`index.html`) where former Pipedrivers sign up for the alumni party. Each sign-up is written to a Google Sheet in the background, and the page links to a shared Google Photos album for photos.

## 1. Connect the Google Sheet (about 5 minutes)

1. Create a new Google Sheet, e.g. "Class of 2026 sign-ups".
2. In the sheet, open **Extensions → Apps Script**.
3. Delete the starter code, paste in everything from `apps-script.gs`, and save.
4. Click **Deploy → New deployment**, choose type **Web app**, and set:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, approve the permissions, and copy the **Web app URL** (it ends with `/exec`).
6. In `index.html`, find the `CONFIG` block near the bottom and paste the URL into `SHEET_ENDPOINT`.

The script creates a "Sign-ups" tab with the columns *Signed up at, Name, Email, Graduation year*. If someone signs up twice with the same email, their row is updated.

If you change the script later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## 2. Photo album

The yearbook button links to a shared Google Photos album (`DRIVE_LINK` in `CONFIG`). Use the album's **Share → Create link** URL (`https://photos.app.goo.gl/...`), not the address bar, and turn on **Collaborate** in the album options so guests can add photos.

## 3. Party details

Set `EVENT_DATE` and `EVENT_PLACE` in `CONFIG`. `FIRST_YEAR` / `LAST_YEAR` control the graduation-year dropdown.

## 4. Fonts

The main title uses **Tanker** (Indian Type Foundry), already included in `fonts/`. Keep the `fonts/` folder next to `index.html` when you upload the site.

Section headings also use Tanker. All other text, including buttons, uses **Inter**, loaded from Google Fonts.

## 5. Put it online

It's one static file, so any static host works:

- **Netlify Drop:** drag the folder onto https://app.netlify.com/drop
- **GitHub Pages:** push the folder to a repo and enable Pages
- **Google Sites / Vercel / Cloudflare Pages** also work
