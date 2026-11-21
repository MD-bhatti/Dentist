/*
# Tighten appointments grants to INSERT-only for anon/authenticated

## Purpose
The previous migration granted full CRUD to anon/authenticated as a precaution,
but the only RLS policy in place is an INSERT policy. RLS already blocks
SELECT/UPDATE/DELETE (no matching policies), yet best practice is least privilege:
grant only what the app needs. The frontend only ever inserts booking requests.

## Changes
- Revoke SELECT, UPDATE, DELETE from anon and authenticated on `appointments`.
- Re-grant INSERT only to anon and authenticated.
- service_role retains full CRUD for clinic staff.

## Security
- RLS remains enabled.
- INSERT policy "Anyone can request an appointment" remains in place.
- No SELECT/UPDATE/DELETE policies exist, and now no grants either — defense in depth.
*/

REVOKE SELECT, UPDATE, DELETE ON appointments FROM anon, authenticated;
GRANT INSERT ON appointments TO anon, authenticated;
