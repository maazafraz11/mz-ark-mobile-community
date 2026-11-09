# MZ ARK MOBILE Community Platform

A polished Next.js application for discovering ARK Mobile servers, managing owner listings, and moderating community content.

## Features
- Public community landing page and server discovery experience
- Server details pages with reviews and rule views
- Owner dashboard and onboarding workflow
- Protected admin moderation area
- Supabase-ready auth, RLS, and schema scaffolding
- Responsive dark gaming UI with original MZ ARK MOBILE visual identity

## Tech stack
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn-style components
- Supabase client and schema scaffolding
- Lucide icons

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Add your Supabase credentials in `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   ```

4. Run the app:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`

## Project structure
- `app/` — routes for public pages, auth, owner dashboard and admin styles
- `components/` — UI primitives and section components
- `lib/` — mock data, helper functions and Supabase client
- `supabase/` — SQL schema and RLS examples

## Supabase setup
1. Create a new Supabase project.
2. Run the SQL in `supabase/schema.sql` in the SQL editor.
3. Apply the RLS policies from `supabase/rls.sql`.
4. Enable authentication and email sign-in.
5. Add your website domain to allowed redirect URLs.

## Deployment
- Use Vercel for the frontend deployment.
- Set environment variables in the project dashboard.
- Add your Supabase project URL and anon key to production settings.

## Notes
- This project uses demo/mock data where a live backend or Supabase instance is not configured.
- The public site and dashboard routes are implemented as working app scaffolds ready for real Supabase integration.
