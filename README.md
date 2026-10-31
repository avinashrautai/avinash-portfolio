# Avinash Raut — portfolio

A responsive editorial portfolio built with Next.js App Router, TypeScript, and Supabase. Public pages run locally from bundled seed content when Supabase is not configured. The private `/admin` dashboard supports project, writing, site setting, and project image updates once Supabase is connected.

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The public site works without credentials. The contact page will explicitly show that email has not been configured until a real address is supplied.

## Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL` — Project URL from **Project Settings → API**.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — publishable/anon key from **Project Settings → API**. Do not use a service-role key in this app.
   - `ADMIN_USER_IDS` — comma-separated UUID(s) of the people allowed to manage this portfolio.
   - `NEXT_PUBLIC_CONTACT_EMAIL` — Avinash’s real contact email.
   - `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` locally; the production origin after deployment.
3. In the Supabase SQL Editor, run `supabase/schema.sql`, then `supabase/seed.sql`.
4. In **Authentication → Users**, create an account for the site owner. Copy its user UUID into both `ADMIN_USER_IDS` and the final insert statement in `schema.sql`, then run:

   ```sql
   insert into public.portfolio_admins (user_id) values ('YOUR_AUTH_USER_UUID');
   ```

5. Restart Next.js, visit `/admin/login`, and sign in. The database RLS policies independently restrict all edits to UUIDs in `portfolio_admins`. The app also checks `ADMIN_USER_IDS` before rendering admin pages and accepting image uploads.

The `portfolio-media` public-read bucket is created by the schema. Only an authorized admin can upload, update, or delete files. Public visibility is required to display portfolio images; do not upload private material to this bucket.

## Content and admin

- Public pages: Home, Work, project details, Writing, article details, About, Contact.
- `/admin` requires a Supabase session and an allowlisted user ID.
- Add and edit projects and articles; published status controls public visibility.
- Site Settings edits the email, location, availability, and About introduction.
- Project images can be uploaded as JPG, PNG, or WebP up to 8 MB, or set via URL.
- Seeded projects show the confirmed scope and current status. The Writing page stays available and displays “Writing is being prepared” until real articles are added.

## Checks

```bash
npm run typecheck
npm run build
```

## Deploy to Vercel

1. Push this project to a Git repository you control, then import that repository into Vercel (or run `npx vercel`).
2. Set the production environment variables from `.env.example` in **Vercel → Project → Settings → Environment Variables**. Use the same Supabase URL, anon key, admin UUID, and contact email as local setup. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin.
3. Confirm the Supabase Auth user UUID appears in both the Vercel `ADMIN_USER_IDS` value and `public.portfolio_admins` table.
4. Deploy. Vercel detects the Next.js app automatically; the standard build command is `npm run build`.
5. Add the production domain under Vercel **Project → Settings → Domains**, then update `NEXT_PUBLIC_SITE_URL` if needed and redeploy.

No Vercel token, project ID, or Supabase credentials are included in this workspace. Supply them in their respective dashboards; never commit `.env.local` or a service-role secret.
