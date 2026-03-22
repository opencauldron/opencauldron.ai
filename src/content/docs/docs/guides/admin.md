---
title: Admin Panel
description: Manage users, view team-wide usage, set daily limits, grant XP, and award badges from the admin panel.
---

The admin panel gives administrators a full view of team activity and direct control over user accounts. Navigate to `/admin` in the sidebar to access it.

Only users with the `admin` role can reach this page. Any other user gets a `403 Forbidden` response from the underlying APIs and will see an error message instead of the dashboard.

---

## Setting up the first admin

There is no automatic first-admin promotion. All accounts are created with the `member` role by default — including the very first user to sign in.

To create your first admin, run a direct SQL update against the database after the account exists:

```sql
UPDATE users SET role = 'admin' WHERE email = 'you@example.com';
```

Using the Docker Compose setup from the project root:

```bash
docker compose exec db psql -U cauldron -d cauldron \
  -c "UPDATE users SET role = 'admin' WHERE email = 'you@example.com';"
```

Once you have at least one admin, you can promote additional users through the admin panel UI without touching the database again.

---

## Team overview

The top of the admin panel shows three summary cards:

| Card | What it shows |
|------|---------------|
| Today (Team) | Total completed generations across all users today, and estimated cost |
| This Month (Team) | Total completed generations and estimated cost for the last 30 days |
| Team Members | Total number of user accounts |

"Today" resets at midnight UTC. "This Month" is a rolling 30-day window, not a calendar month.

Only generations with a `completed` status are counted in these totals. Failed and in-progress generations are excluded.

---

## Usage by model

Below the summary cards, a **Usage by Model (30 days)** section shows a breakdown of the last 30 days of completed generations grouped by model. Each row displays:

- The model name
- Number of generations
- Estimated cost

This section only appears if there is at least one completed generation in the window. It covers all users collectively — it is not filtered per user.

---

## User management table

The **Team Members** table lists every account with the following columns:

| Column | Description |
|--------|-------------|
| User | Avatar, display name, and email address |
| Role | `admin` or `member`, shown as a badge |
| Daily Limit | The user's current per-day generation cap |
| Monthly Gens | Completed generations in the last 30 days |
| Monthly Cost | Estimated cost for those generations |

The table is ordered by account creation date (oldest first).

---

## Editing a user

Click the pencil icon on any row to open the edit dialog for that user. Two fields are editable:

**Role** — Toggle between `member` and `admin` using the button pair. Promoting a user to admin gives them full access to the admin panel and all admin APIs immediately (role is checked from the database on every request, not from the session).

**Daily Limit** — Enter any integer from `1` to `10,000`. The new limit takes effect on the next generation request — there is no cooldown or delay.

Click **Save** to apply changes. The table updates in place without a full page reload.

> **Note:** You can change your own role. If you demote yourself from admin to member, you will lose access to the admin panel immediately. Make sure at least one other admin account exists before doing this.

---

## Granting XP

Admins can award XP to any user directly, bypassing normal generation-based earning. This is done via the API:

```bash
POST /api/credits/topup
Content-Type: application/json

{
  "userId": "<target-user-uuid>",
  "amount": 100
}
```

The `amount` must be a positive integer. The XP is recorded as an `admin_grant` transaction in the `xp_transactions` table, so it appears in the user's XP history. The response includes the user's new level if the grant caused a level-up:

```json
{
  "success": true,
  "userId": "...",
  "xpAwarded": 100,
  "newLevel": 4
}
```

There is no UI for this in the admin panel — use the API directly (for example, with `curl` or a REST client).

---

## Granting badges

Admins can manually award any badge to any user regardless of whether they have met the normal unlock conditions:

```bash
POST /api/badges/grant
Content-Type: application/json

{
  "userId": "<target-user-uuid>",
  "badgeId": "first-spark"
}
```

Both the `userId` (a UUID) and `badgeId` (a text identifier such as `"early-adopter"`) must refer to existing records. The API returns `404` if either is not found. If the user already holds the badge, the request is a no-op — duplicate badge grants are not created.

Like XP grants, there is no UI for this — use the API directly.

---

## Access control details

Every admin endpoint checks the caller's role by reading the `users` table on each request — it does not rely on the session token alone. This means:

- Role changes take effect instantly with no need to sign out and back in.
- Demoting a user blocks their access to admin APIs on the next request even if they still hold a valid session.

All admin routes return `401 Unauthorized` for unauthenticated requests and `403 Forbidden` for authenticated non-admin users.

---

## Related

- [Usage and Limits](/docs/guides/usage-and-limits) — Per-user generation limits and cost tracking detail
- [XP, Levels, and Feats](/docs/guides/xp-and-feats) — How the XP system works and what badges exist
- [Team Collaboration](/docs/guides/teams) — Overview of roles and shared gallery
