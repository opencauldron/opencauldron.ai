---
title: Issues and Feature Requests
description: How to file a useful bug report or feature request for OpenCauldron.
---

Issues are tracked on GitHub for each repo:

- **Main app bugs and features:** [github.com/opencauldron/opencauldron/issues](https://github.com/opencauldron/opencauldron/issues)
- **Docs site issues:** [github.com/opencauldron/opencauldron-website/issues](https://github.com/opencauldron/opencauldron-website/issues)
- **CLI issues:** [github.com/opencauldron/create-opencauldron/issues](https://github.com/opencauldron/create-opencauldron/issues)

Before opening a new issue, search existing open and closed issues to see if it has already been reported or discussed.

---

## Bug reports

A good bug report gives the maintainer enough information to reproduce the problem without asking follow-up questions.

### What to include

**Environment**

```
- OpenCauldron version (the version in package.json, or the git commit)
- Node.js or Bun version
- Operating system
- Deployment type: local dev / Docker / Vercel / other
- Browser (if the bug is a UI issue)
```

**What happened**

Describe what you saw. Include error messages exactly as they appeared — copy the full text, not a summary.

If the bug involves the generation API, include the full error from the browser's network tab or server logs.

**What you expected**

Describe what should have happened instead.

**Steps to reproduce**

A numbered list of exactly what to do to trigger the bug. Be specific:

```
1. Set GEMINI_API_KEY in .env.local
2. Start the dev server with `bun run dev`
3. Sign in
4. Select Imagen 4, enter the prompt "a red apple", click Generate
5. The loading spinner appears and never resolves
```

**Logs**

Paste relevant server-side output. Run `bun run dev` in a terminal and copy the error lines that appear when the bug occurs.

### What not to include

- Do not include API keys, database connection strings, or any secret values.
- Do not include large amounts of unrelated log output — trim it to the relevant lines.

---

## Feature requests

Feature requests are welcome. The more context you provide, the easier it is to evaluate whether and how to implement it.

### What to include

**The problem you are trying to solve**

Describe the situation that prompted the request. "I want X" is less useful than "When I do Y, I have to Z which is tedious because...".

**Your proposed solution**

What would you like to happen? This does not have to be technical — describe the behavior you want, not necessarily the implementation.

**Alternatives you considered**

If you thought of other ways to solve the problem, mention them. This helps avoid duplicating thinking that has already happened.

### Provider requests

To request support for a new AI provider, open an issue using the format above and include:

- The provider name and API documentation URL
- Which model(s) you want supported and their media type (image or video)
- Whether you are willing to implement it yourself (if so, see [Adding a Provider](/docs/guides/adding-providers))

If you are willing to implement the provider, say so in the issue. Maintainers can confirm the approach before you spend time writing code.

---

## Community discussion

For questions that are not bugs or feature requests — general help, deployment questions, ideas that are not fully formed — use the [Discord server](https://discord.gg/opencauldron) rather than GitHub issues.

---

## Related

- [Adding a Provider](/docs/guides/adding-providers) — If you want to implement a provider yourself
- [Contributing Overview](/docs/contributing) — The full contribution process
- [Development Setup](/docs/contributing/development-setup) — Getting the app running for local development
