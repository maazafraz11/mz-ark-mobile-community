# MZ ARK MOBILE Community Platform

Next.js 14 + TypeScript community platform for original ARK Mobile players and server owners. The public design keeps the MZ ARK MOBILE identity and “THE LEGACY NEVER DIES” slogan.

## Configure Supabase

1. Create a Supabase project and open **Project Settings → API Keys**.
2. Copy the project URL and publishable key (`sb_publishable_...`). The publishable/anon key is intended for browser use; never expose a `service_role` or secret key.
3. Copy `.env.example` to `.env.local` and set:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_KEY
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
4. Run `supabase/schema.sql` in the Supabase SQL Editor. It creates the tables, indexes, profile signup trigger, RLS policies, and private asset bucket.
5. In **Authentication → URL Configuration**, set the site URL and add `http://localhost:3000/**` plus your deployed origin to redirect URLs. Enable email/password and configure SMTP for production verification and reset emails.
6. Install and run:
   ```bash
   npm install
   npm run dev
   ```

No project key is stored in this repository. Add deployment variables in your hosting provider’s environment settings.

## Routes

- `/`, `/servers`, `/servers/[id]`: public home, search/discovery and server profile.
- `/shop`, `/about`, `/support`: public information pages.
- `/auth/register`, `/auth/login`, `/auth/forgot-password`, `/auth/reset-password`: account flows.
- `/owners/setup`, `/owners/dashboard`: owner onboarding and management.
- `/admin`: platform-admin area; role checks are enforced in middleware and RLS.
- `/setup`: configuration guidance when credentials are absent.

## Roles and security

Signup only accepts player or server-owner account types; the database trigger assigns roles. Moderator and platform-admin roles must be granted by a trusted administrator in the database. RLS is the authorization boundary for data operations. Owners may create draft/pending listings; only platform admins can approve or feature listings. Do not put a Supabase service-role key in the browser or `NEXT_PUBLIC_*` variables.

The `server-assets` bucket is private and its SQL policies expect storage object paths to begin with the server UUID, for example `<server-uuid>/banner.webp`.

## Tests and deployment

Run `npm run lint` and `npm run build` before deployment. Deploy the Next.js app to Vercel or another Node-compatible host, set the three environment variables above, and add its URL to Supabase Auth redirect URLs. Configure a production SMTP provider and review moderation/storage policies before opening registration.

## Data integrity

Directory records and analytics must come from Supabase; the codebase's `lib/mock-data.ts` is legacy illustrative data only and must not be used as live platform metrics. No player counts, server health, or purchases are represented as live integrations.
