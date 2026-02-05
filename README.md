# Sakhee AI Standalone

Standalone marketing site for Sakhee AI and related product pages, extracted from the main Shikha interface.

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment variables (required for the waitlist form)

Create a `.env.local` file in the repo root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

3. Run the dev server

```bash
npm run dev
```

## Routes

- `/` (same as `/sakhee-ai`)
- `/sakhee-ai`
- `/sakhee-teacher-coach`
- `/sakhee-subject-expert`
- `/sakhee-pedagogy-expert`
- `/sakhee-learning-goals`
- `/sakhee-unit-plan`
- `/sakhee-lesson-plan`
- `/sakhee-assessment`
- `/sakhee-exam-generator`
- `/sakhee-simulator`
- `/sakhee-assessment-checker`
- `/sakhee-dashboard`

## Waitlist

The "Join Waitlist"/"Get Early Access" forms POST to `/api/waitlist/sakhee` and insert into the existing `sakhee_waitlist` table in Supabase.
