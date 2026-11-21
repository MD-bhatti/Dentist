/*
# Create appointments table for clinic booking requests

## Purpose
Stores appointment booking requests submitted by site visitors through the
multi-step "Book Appointment" modal. No sign-in is required to submit a request,
so this is a single-tenant, public-write table.

## New Tables
- `appointments`
  - `id` (uuid, primary key)
  - `name` (text, not null) — patient full name
  - `email` (text, not null) — patient contact email
  - `phone` (text, not null) — patient contact phone
  - `service` (text, not null) — selected treatment (Teeth Whitening, Implants, Invisalign, Emergency Care, Cleaning, Other)
  - `doctor` (text) — preferred doctor name, nullable
  - `preferred_date` (date) — preferred appointment date, nullable
  - `preferred_time` (text) — preferred time slot label, nullable
  - `message` (text) — optional patient notes, nullable
  - `status` (text, not null, default 'pending') — request lifecycle: pending / confirmed / completed / cancelled
  - `created_at` (timestamptz, default now())

## Security
- RLS enabled on `appointments`.
- `anon` + `authenticated` may INSERT new booking requests (any visitor can book).
- `anon` + `authenticated` may NOT SELECT, UPDATE, or DELETE — patient data is private and
  only clinic staff (via service_role / future admin tooling) can read or manage requests.
- `service_role` granted full CRUD for internal clinic use.
- Using (true) is NOT used as an ownership shortcut: the INSERT policy uses a WITH CHECK (true)
  only because any visitor is intentionally permitted to create a booking request, documented here.

## Notes
1. The frontend modal performs an INSERT only; it never reads back appointment rows.
2. preferred_date and preferred_time are stored separately for easier scheduling queries.
3. status defaults to 'pending' so every new request starts in a reviewable state.
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  doctor text,
  preferred_date date,
  preferred_time text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- INSERT: any visitor (anon or authenticated) may submit a booking request
DROP POLICY IF EXISTS "Anyone can request an appointment" ON appointments;
CREATE POLICY "Anyone can request an appointment"
ON appointments FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- service_role full access for clinic staff / future admin tooling
GRANT SELECT, INSERT, UPDATE, DELETE ON appointments TO service_role;
GRANT INSERT ON appointments TO anon, authenticated;
