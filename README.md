# Developer Console Template

A polished developer-platform console — projects, deployments, activity, and team management — built entirely with **[@dlbcodes/my-design-system](https://my-design-system-beta.vercel.app/)**.

It's the technical counterpart to the [assistant template](https://github.com/dlbcodes/dlbcodes-assistant): same component library, a completely different aesthetic. One soft and conversational, this one dense and technical, proving the system doesn't impose a single look.

**[Live demo →](https://dlbcodes-console.vercel.app/)**

![Developer Console Template](./public/og-image.png)

---

## What it shows

A cohesive console that exercises the library across a real, multi-view app:

- **Projects** — a dashboard with usage meters, a deployments feed, and project cards
- **Project detail** — tabbed overview, a git-style deployment timeline, and settings
- **Activity** — a filterable, date-grouped deployment timeline across the workspace
- **Team** — member management with invite, role, and remove flows
- **Account** — profile, API keys, and billing
- **Workspaces** — switch workspaces and the whole dashboard re-contextualizes
- **Command palette** — ⌘K to jump anywhere, fully keyboard-navigable

Everything is composed from [@dlbcodes/my-design-system](https://my-design-system-beta.vercel.app/) — Panel, Field, Select, Tabs, Dropdown, Modal, Progress, and the rest — so it doubles as a real-world example of the components at work.

## Same components, a different feel

This template and the [assistant template](https://github.com/dlbcodes/dlbcodes-assistant) share one component library but look nothing alike. That's the point: a design system should give each product its own voice, not make everything look the same. Restyling happens through semantic design tokens, with no component edits.

See it live in the [theming playground](https://dlbcodes-playground.vercel.app/), or read the [docs](https://my-design-system-beta.vercel.app/).

## Tech

Vite · Vue 3 · TypeScript · Tailwind v4 · [@dlbcodes/my-design-system](https://my-design-system-beta.vercel.app/)

## Running it locally

```bash
git clone https://github.com/dlbcodes/dlbcodes-console.git
cd dlbcodes-console
npm install
npm run dev
```

No config, no API keys — it runs on mock data so you can explore the UI right away.

## License

MIT — use it however you like.

---

Built by [Daniel](https://x.com/dlbcode) with [@dlbcodes/my-design-system](https://my-design-system-beta.vercel.app/).
