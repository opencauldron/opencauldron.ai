---
title: Environment Variables
description: Complete reference of all environment variables.
---

All configuration is done through environment variables. Here is the full list.

## Required

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret for session encryption |
| `NEXTAUTH_URL` | Public URL of your instance |

## Storage

| Variable | Description |
|----------|-------------|
| `R2_ACCOUNT_ID` | Cloudflare R2 account ID |
| `R2_ACCESS_KEY_ID` | R2 access key |
| `R2_SECRET_ACCESS_KEY` | R2 secret key |
| `R2_BUCKET_NAME` | R2 bucket name |

## AI model providers

| Variable | Description |
|----------|-------------|
| `REPLICATE_API_TOKEN` | Replicate API token (Flux Pro, SDXL) |
| `GOOGLE_AI_API_KEY` | Google AI API key (Imagen) |
| `IDEOGRAM_API_KEY` | Ideogram API key |
| `RECRAFT_API_KEY` | Recraft API key |

## Authentication providers

| Variable | Description |
|----------|-------------|
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
