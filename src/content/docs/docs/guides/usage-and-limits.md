---
title: Usage and Limits
description: Understand daily generation limits, cost tracking, and how admins manage per-user quotas.
---

Every user in OpenCauldron has a daily generation limit. This page explains how limits work, what the usage dashboard shows, and how admins can adjust quotas.

## Daily generation limits

Each user can run a set number of generations per day. The default limit is **50 generations per day**.

The limit resets at midnight UTC. It applies to all generation attempts regardless of model, media type, or whether the generation succeeded.

When you reach your limit, the generate API returns a `429` response:

```json
{
  "error": "Daily generation limit reached",
  "limit": 50
}
```

No generation is created or charged when this response is returned.

## Usage dashboard

Navigate to **Usage** in the sidebar to see your personal usage statistics.

The dashboard shows four summary cards:

| Card | What it shows |
|------|---------------|
| Today | Generations used today with a progress bar against your daily limit |
| Today Cost | Estimated cost of today's generations |
| This Week | Generation count and cost for the last 7 days |
| This Month | Generation count and cost for the last 30 days |

Below the summary cards, a **Usage by Model** section breaks down your generation count and estimated cost per model for the last 30 days.

A **Recent Generations** table shows your last 20 generations with the prompt, model, status, generation duration, and estimated cost per generation.

Only completed generations are counted in cost and stat totals. Failed or in-progress generations are included in the recent table but excluded from the cost and count aggregates.

## Cost tracking

Each generation has a `costEstimate` stored in the database. Costs are calculated as follows:

- **Image generations:** cost per image as defined by the provider
- **Video generations:** cost per second × requested duration

These are estimates based on provider pricing at the time the generation is submitted. Actual charges from your provider may differ slightly. OpenCauldron does not bill you directly — the cost estimates are informational and help you track spend against provider accounts you control.

Cost estimates are stored on both the generation record and the resulting asset record.

## Admin usage view

Admins can view team-wide usage from the **Admin** panel.

The admin view shows three top-level cards:

| Card | What it shows |
|------|---------------|
| Today (Team) | Total generations and estimated cost across all users today |
| This Month (Team) | Total generations and estimated cost across all users in the last 30 days |
| Team Members | Total number of users |

A **Usage by Model (30 days)** section shows the generation count and estimated cost for each model across all users.

A **Team Members** table lists every user with their role, current daily limit, monthly generation count, and monthly estimated cost.

## Adjusting limits

Admins can change any user's daily limit from the Team Members table in the Admin panel. Click the edit icon on any row to open the edit dialog, update the **Daily Limit** field, and save.

The valid range for a daily limit is **1 to 10,000** generations per day. Changes take effect immediately — the new limit is checked on the next generation request.

You can also change a user's role (member or admin) from the same dialog.

## What limits don't cover

There are no per-brand spending limits and no monthly generation caps. The only enforced limit is the per-user daily generation count. If you need tighter cost controls, adjust daily limits downward for high-volume users or set a low limit across the board and raise it for specific users as needed.
