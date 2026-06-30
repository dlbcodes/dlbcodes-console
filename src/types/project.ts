export interface User {
	name: string;
	email: string;
	avatar?: string;
}

export type ProjectStatus = "active" | "building" | "failed" | "paused";

export type DeploymentStatus = "ready" | "building" | "failed" | "queued";

export interface Deployment {
	id: string;
	status: DeploymentStatus;
	branch: string;
	commit: string;        // short hash, mono
	message: string;       // commit message
	author: string;
	createdAt: number;
	duration?: number;     // seconds, for completed builds
}

export interface Project {
	id: string;
	name: string;
	framework: string;     // "Vue", "Next.js", etc. — shows a tech badge
	status: ProjectStatus;
	repo: string;          // "dlbcodes/my-app" — mono
	domain: string;        // "my-app.dlb.dev" — mono
	region: string;        // "fra1", etc.
	updatedAt: number;
	deployments: Deployment[];  // for the Activity tab
}