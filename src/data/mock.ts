import type { Project, User, Workspace, Member } from "../types/console";

// ─────────────────────────────────────────────────────────────────────────
// Mock data for the template. This is the only place fake data lives, so it's
// the first thing to replace when you wire a real backend. The shapes conform
// to the contracts in types/console.ts, so swapping in real data is type-safe.
//
// The "dlbcodes" workspace mirrors real projects in this ecosystem — the
// design system this template is built with, its playground, and the two
// companion templates — so the demo doubles as a tour of the work.
// ─────────────────────────────────────────────────────────────────────────

export const currentUser: User = {
	name: "Dana Lewis",
	email: "dana@example.com",
	avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Dana",
};

// ── Workspaces (the switcher at the top of the sidebar) ──
export const workspaces: Workspace[] = [
	{ id: "dlbcodes", name: "dlbcodes", plan: "Enterprise" },
	{ id: "personal", name: "Personal", plan: "Free" },
];

const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const now = Date.now();

export const projects: Project[] = [
	{
		id: "my-design-system",
		workspaceId: "dlbcodes",
		name: "my-design-system",
		framework: "VitePress",
		status: "active",
		repo: "dlbcodes/my-design-system",
		domain: "ui.dlbcodes.com",
		region: "fra1",
		updatedAt: now - 12 * MINUTE,
		deployments: [
			{
				id: "dpl_a3f8c21",
				status: "ready",
				branch: "main",
				commit: "a3f8c21",
				message: "Add MultiSelect adaptive-width recipe",
				author: "Daniel",
				createdAt: now - 12 * MINUTE,
				duration: 42,
			},
			{
				id: "dpl_7b1e094",
				status: "ready",
				branch: "main",
				commit: "7b1e094",
				message: "Document the Field compound family",
				author: "Daniel",
				createdAt: now - 5 * HOUR,
				duration: 38,
			},
			{
				id: "dpl_2c9d551",
				status: "ready",
				branch: "feat/tokens",
				commit: "2c9d551",
				message: "Expand semantic token layer",
				author: "Daniel",
				createdAt: now - 1 * DAY,
				duration: 51,
			},
		],
	},
	{
		id: "dlbcodes-console",
		workspaceId: "dlbcodes",
		name: "dlbcodes-console",
		framework: "Vue",
		status: "building",
		repo: "dlbcodes/dlbcodes-console",
		domain: "console.dlbcodes.com",
		region: "iad1",
		updatedAt: now - 2 * MINUTE,
		deployments: [
			{
				id: "dpl_f04aa12",
				status: "building",
				branch: "main",
				commit: "f04aa12",
				message: "Add git-style deployment timeline",
				author: "Daniel",
				createdAt: now - 2 * MINUTE,
			},
			{
				id: "dpl_9e22b73",
				status: "ready",
				branch: "main",
				commit: "9e22b73",
				message: "Split account and team settings",
				author: "Daniel",
				createdAt: now - 8 * HOUR,
				duration: 67,
			},
		],
	},
	{
		id: "dlbcodes-assistant",
		workspaceId: "dlbcodes",
		name: "dlbcodes-assistant",
		framework: "Vue",
		status: "active",
		repo: "dlbcodes/dlbcodes-assistant",
		domain: "assistant.dlbcodes.com",
		region: "fra1",
		updatedAt: now - 40 * MINUTE,
		deployments: [
			{
				id: "dpl_b81f3a0",
				status: "ready",
				branch: "main",
				commit: "b81f3a0",
				message: "Polish the command palette",
				author: "Daniel",
				createdAt: now - 40 * MINUTE,
				duration: 44,
			},
			{
				id: "dpl_5d7c918",
				status: "ready",
				branch: "main",
				commit: "5d7c918",
				message: "Refactor sidebar into feature folders",
				author: "Daniel",
				createdAt: now - 2 * DAY,
				duration: 55,
			},
		],
	},
	{
		id: "dlbcodes-playground",
		workspaceId: "dlbcodes",
		name: "dlbcodes-playground",
		framework: "Vue",
		status: "active",
		repo: "dlbcodes/dlbcodes-playground",
		domain: "playground.dlbcodes.com",
		region: "sfo1",
		updatedAt: now - 3 * HOUR,
		deployments: [
			{
				id: "dpl_cc41e8f",
				status: "ready",
				branch: "main",
				commit: "cc41e8f",
				message: "Dogfood library components in the customizer",
				author: "Daniel",
				createdAt: now - 3 * HOUR,
				duration: 29,
			},
			{
				id: "dpl_71fe302",
				status: "ready",
				branch: "main",
				commit: "71fe302",
				message: "Add live theme token editing",
				author: "Daniel",
				createdAt: now - 1 * DAY,
				duration: 33,
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
				id: "dpl_cc41e8f2",
				status: "ready",
				branch: "main",
				commit: "cc41e8f",
				message: "Write up the theming deep-dive post",
				author: "Daniel",
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
				author: "Daniel",
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
	// dlbcodes — a full team
	{
		id: "m1",
		workspaceId: "dlbcodes",
		name: "Dana Lewis",
		email: "dana@example.com",
		role: "Owner",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Dana",
	},
	{
		id: "m2",
		workspaceId: "dlbcodes",
		name: "Sam Ortiz",
		email: "sam@example.com",
		role: "Admin",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sam",
	},
	{
		id: "m3",
		workspaceId: "dlbcodes",
		name: "Priya Shah",
		email: "priya@example.com",
		role: "Member",
		avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya",
	},
	{
		id: "m4",
		workspaceId: "dlbcodes",
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