# MZ ARK MOBILE Community Platform

Next.js 14 + TypeScript community platform for original ARK Mobile players and server owners.

## Local setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` plus `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your Supabase project URL and **publishable** key.
3. Run `supabase/schema.sql` in the Supabase SQL Editor.
4. Configure Supabase Auth email/password, SMTP, and redirect URLs (`http://localhost:3000/auth/callback`).
5. Run `npm run dev`.

The publishable key is meant for client use. Never add a service-role/secret key to this repository or any `NEXT_PUBLIC_*` variable. The credentials shared in chat have not been committed; use local/deployment environment settings.

## Implemented routes
Public: `/`, `/servers`, `/servers/[id]`, `/shop`, `/about`, `/support`.
Auth: `/auth/register`, `/auth/login`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/callback`.
Owner: `/owners/setup`, `/owners/dashboard`.
Admin: `/admin`.

Server directory and moderation queue read live Supabase data; server onboarding inserts draft or pending listings. Email verification and password reset use Supabase Auth. Middleware verifies sessions for protected pages, and database RLS is the data authorization boundary. Admin approval/feature changes are additionally restricted by SQL policies and trigger checks. The public listing UI deliberately does not claim live server health or player counts.

## Database and security notes
Apply `supabase/schema.sql`. It includes profiles, servers, owner/staff relationships, claims, images, reviews, favorites, announcements, analytics events, reports, indexes, a signup trigger, RLS policies and a private image bucket. Only trusted operators should grant `moderator` or `platform_admin` roles. RLS and policies are mandatory; do not disable them. Review your deployment and auth settings before public launch.

## Verify / deploy
`npm run lint` and `npm run build`. Deploy to Vercel or another Node-compatible host, configure the environment variables in the host, and add the production callback URL in Supabase Auth URL settings. No purchases are processed in the Shop; the page should be informational only until an approved checkout integration exists.
