---
title: XP, Levels, and Feats
description: How the experience point system works, what each level unlocks, and how to earn all 11 feats.
---

Every generation you complete earns XP. Earn enough and you level up, unlock new capabilities, and collect feats along the way. This page covers everything the system tracks and what it takes to progress.

## Earning XP

XP is awarded automatically when a generation completes successfully. The amount depends on the model you used and whether you generated an image or a video.

### Image generation rewards

| XP | Models |
|----|--------|
| 10 XP | Imagen 4, Ideogram 3, Grok Imagine Pro, Flux 1.1 Pro, Recraft V3 |
| 5 XP | Imagen Flash, Imagen Flash Lite, Grok Imagine, Flux Dev, Recraft 20B |
| 5 XP | All other image models (default) |

Higher-tier models award more XP — using the best tools for the job pays off.

### Video generation rewards

| Duration | XP |
|----------|----|
| Up to 5 seconds | 25 XP |
| Over 5 seconds | 50 XP |

Video generations award substantially more XP than images, reflecting the additional compute involved.

### Feat rewards

Unlocking a feat grants a one-time XP bonus on top of your generation XP. Each feat's reward is listed in the [Feats](#feats) section below.

---

## Levels

There are 8 levels. Your level is determined by your total lifetime XP.

| Level | Title | XP required |
|-------|-------|-------------|
| 1 | Apprentice | 0 XP |
| 2 | Herbalist | 50 XP |
| 3 | Alchemist | 150 XP |
| 4 | Enchanter | 400 XP |
| 5 | Warlock | 800 XP |
| 6 | Archmage | 1,500 XP |
| 7 | Mythweaver | 3,000 XP |
| 8 | Elder | 6,000 XP |

Level 8 is the maximum. Your profile shows a circular progress ring indicating how far you are toward the next threshold.

### Video access unlocks at Level 3 (Alchemist)

> **Video generation is locked until you reach Level 3.** Once you hit 150 XP and become an Alchemist, video models appear in the interface automatically — no action required. This is the most significant unlock in the progression system.

To reach Level 3 quickly: generate 15 images with a 10 XP model, or a combination of images and feats. Earning the First Brew feat (+10 XP) and the Ranger feat (+25 XP) alongside regular generation XP gets you there fast.

---

## Feats

Feats are permanent achievements that appear on your profile. They are awarded automatically when you meet the unlock condition — you never need to claim them manually. Most feats also grant bonus XP.

### Milestone feats

| Feat | Condition | XP reward |
|------|-----------|-----------|
| **First Brew** | Complete your first generation | +10 XP |
| **Centaur** | Complete 100 generations | +50 XP |
| **Hydra** | Complete 1,000 generations | +100 XP |

### Streak feats

| Feat | Condition | XP reward |
|------|-----------|-----------|
| **Kindling** | 7-day generation streak | +25 XP |
| **Inferno** | 30-day generation streak | +100 XP |

Streaks count calendar days. You need at least one completed generation on each consecutive day. Missing a day resets the streak to zero, so consistency matters more than volume.

### Model feat

| Feat | Condition | XP reward |
|------|-----------|-----------|
| **Ranger** | Generate with 5 or more different image models | +25 XP |

Only image models count toward Ranger — video models are excluded.

### Quality feat

| Feat | Condition | XP reward |
|------|-----------|-----------|
| **Sigil** | Tag 50 or more assets with brands | +25 XP |

Tagging assets with [brands](/docs/guides/brands) is the fastest path to this one if you're already organizing your library.

### Video feats

| Feat | Condition | XP reward |
|------|-----------|-----------|
| **Illusionist** | Complete your first video generation | +20 XP |
| **Conjurer** | Complete 50 video generations | +50 XP |

Both of these require video access, which itself requires Level 3. Illusionist is a natural first step after you unlock video.

### Special feats

These feats are granted rather than earned through activity. They carry no XP reward but display prominently on your profile.

| Feat | Description |
|------|-------------|
| **Early Adopter** | Joined in the first month of the instance |
| **Admin** | Team administrator |
| **Founder** | Instance creator and owner |

---

## Streaks

Your streak is the number of consecutive calendar days on which you completed at least one generation. The streak counter appears on your profile and in the app header when it's active.

A few rules to keep in mind:

- The streak starts at 1 on your first day generating.
- Each new calendar day you generate extends it by 1.
- If you skip a day entirely, the streak resets to 0. Generating twice in one day does not make up for a missed day.
- The streak is checked against the date your generations were created, not the time zone of the server — the check uses the generation's timestamp date.

Reach 7 consecutive days to earn **Kindling**. Keep going to 30 for **Inferno**.

---

## Your profile

Your profile page at `/profile/[your-id]` displays everything the system tracks about you:

- **XP ring** — A circular progress indicator showing your level number and how far you are to the next threshold.
- **Level title** — Your current rank (Apprentice through Elder) shown alongside your XP total.
- **Streak** — Your current consecutive-day streak, shown in the header area when active.
- **Favorite model** — Automatically determined from your generation history — whichever model you've used most.
- **Total generations** — Your all-time completed generation count.
- **Feats** — All 11 feats displayed in a grid. Feats you've earned are highlighted; locked feats appear dimmed with a lock icon. Each card shows the feat's XP reward and, if earned, when you earned it.
- **Recent creations** — A thumbnail grid of your most recent generated images and videos.

Your profile is public — anyone with the URL can view it.

---

## Leaderboard

The leaderboard at `/leaderboard` shows the top 10 users across three categories:

| Category | Metric | Window |
|----------|--------|--------|
| **Top Generators** | Completed generation count | This calendar month |
| **Most Feats** | Total feats earned | All time |
| **Highest XP** | Total accumulated XP | All time |

Each entry links to that user's profile. The Top Generators board resets at the start of each month — the other two are cumulative.
