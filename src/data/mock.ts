import type { Project, User, Workspace, Member } from "../types/console";

// ─────────────────────────────────────────────────────────────────────────
// Mock data for the template. This is the only place fake data lives, so it's
// the first thing to replace when you wire a real backend. The shapes conform
// to the contracts in types/console.ts, so swapping in real data is type-safe.
// ─────────────────────────────────────────────────────────────────────────

export const currentUser: User = {
	name: "Dana Lewis",
	email: "dana@example.com",
	avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Dana",
};

// ── Workspaces (the switcher at the top of the sidebar) ──
export const workspaces: Workspace[] = [
	{ id: "acme", name: "Acme Inc", plan: "Enterprise" },
	{ id: "personal", name: "Personal", plan: "Free" },
];

const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const now = Date.now();

export const projects: Project[] = [
	{
		id: "marketing-site",
		workspaceId: "acme",
		name: "marketing-site",
		framework: "Nuxt",
		status: "active",
		repo: "acme/marketing-site",
		domain: "https://dlbcodes-playground.vercel.app",
		region: "fra1",
		updatedAt: now - 12 * MINUTE,
		deployments: [
			{
				id: "dpl_a3f8c21",
				status: "ready",
				branch: "main",
				commit: "a3f8c21",
				message: "Fix hero spacing on mobile",
				author: "Dana Lewis",
				createdAt: now - 12 * MINUTE,
				duration: 42,
			},
			{
				id: "dpl_7b1e094",
				status: "ready",
				branch: "main",
				commit: "7b1e094",
				message: "Add pricing FAQ section",
				author: "Dana Lewis",
				createdAt: now - 5 * HOUR,
				duration: 38,
			},
			{
				id: "dpl_2c9d551",
				status: "ready",
				branch: "feat/testimonials",
				commit: "2c9d551",
				message: "Wire up testimonials carousel",
				author: "Sam Ortiz",
				createdAt: now - 1 * DAY,
				duration: 51,
			},
		],
	},
	{
		id: "api-gateway",
		workspaceId: "acme",
		name: "api-gateway",
		framework: "Node",
		status: "building",
		repo: "acme/api-gateway",
		domain: "https://picdash.co",
		region: "iad1",
		updatedAt: now - 2 * MINUTE,
		deployments: [
			{
				id: "dpl_f04aa12",
				status: "building",
				branch: "main",
				commit: "f04aa12",
				message: "Add rate limiting middleware",
				author: "Dana Lewis",
				createdAt: now - 2 * MINUTE,
			},
			{
				id: "dpl_9e22b73",
				status: "ready",
				branch: "main",
				commit: "9e22b73",
				message: "Bump dependencies",
				author: "Dana Lewis",
				createdAt: now - 8 * HOUR,
				duration: 67,
			},
		],
	},
	{
		id: "dashboard-app",
		workspaceId: "acme",
		name: "dashboard-app",
		framework: "Vue",
		status: "failed",
		repo: "acme/dashboard-app",
		domain: "app.acme.dev",
		region: "fra1",
		updatedAt: now - 40 * MINUTE,
		deployments: [
			{
				id: "dpl_b81f3a0",
				status: "failed",
				branch: "feat/billing",
				commit: "b81f3a0",
				message: "Add billing usage meters",
				author: "Sam Ortiz",
				createdAt: now - 40 * MINUTE,
				duration: 19,
			},
			{
				id: "dpl_5d7c918",
				status: "ready",
				branch: "main",
				commit: "5d7c918",
				message: "Refactor sidebar navigation",
				author: "Dana Lewis",
				createdAt: now - 2 * DAY,
				duration: 55,
			},
		],
	},
	{
		id: "personal-site",
		workspaceId: "personal",
		name: "personal-site",
		framework: "VitePress",
		status: "active",
		repo: "dlbcodes/personal-site",
		domain: "dlbcodes.dev",
		region: "sfo1",
		updatedAt: now - 6 * HOUR,
		deployments: [
			{
				id: "dpl_cc41e8f",
				status: "ready",
				branch: "main",
				commit: "cc41e8f",
				message: "Write up the theming deep-dive post",
				author: "Dana Lewis",
				createdAt: now - 6 * HOUR,
				duration: 29,
			},
		],
	},
	{
		id: "side-bot",
		workspaceId: "personal",
		name: "side-bot",
		framework: "Node",
		status: "paused",
		repo: "dlbcodes/side-bot",
		domain: "bot.dlbcodes.dev",
		region: "iad1",
		updatedAt: now - 9 * DAY,
		deployments: [
			{
				id: "dpl_18ab490",
				status: "ready",
				branch: "main",
				commit: "18ab490",
				message: "Pause cron jobs while reworking the API",
				author: "Dana Lewis",
				createdAt: now - 9 * DAY,
				duration: 73,
			},
		],
	},
];

export const findProject = (id: string): Project | undefined =>
	projects.find((p) => p.id === id);

// ── Team members (per workspace) ──
export const members: Member[] = [
	// Acme — a full team
	{
		id: "m1",
		workspaceId: "acme",
		name: "Dana Lewis",
		email: "dana@example.com",
		role: "Owner",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Dana",
	},
	{
		id: "m2",
		workspaceId: "acme",
		name: "Sam Ortiz",
		email: "sam@example.com",
		role: "Admin",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sam",
	},
	{
		id: "m3",
		workspaceId: "acme",
		name: "Priya Shah",
		email: "priya@example.com",
		role: "Member",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya",
	},
	{
		id: "m4",
		workspaceId: "acme",
		name: "",
		email: "alex@example.com",
		role: "Member",
		pending: true,
	},
	// Personal — just the owner
	{
		id: "m5",
		workspaceId: "personal",
		name: "Dana Lewis",
		email: "dana@example.com",
		role: "Owner",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Dana",
	},
];