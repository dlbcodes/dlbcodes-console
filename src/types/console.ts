// src/types/console.ts

export interface User {
	name: string;
	email: string;
	avatar?: string;
}

export type WorkspacePlan = "Enterprise" | "Pro" | "Free";

export interface Workspace {
	id: string;
	name: string;
	plan: WorkspacePlan;
}

export type ProjectStatus = "active" | "building" | "failed" | "paused";

export type DeploymentStatus = "ready" | "building" | "failed" | "queued";

export interface Deployment {
	id: string;
	status: DeploymentStatus;
	branch: string;
	commit: string; // short hash
	message: string;
	author: string;
	createdAt: number;
	duration?: number; // seconds, for finished builds
}

export interface Project {
	id: string;
	workspaceId: string;
	name: string;
	framework: string;
	status: ProjectStatus;
	repo: string;
	domain: string;
	region: string;
	updatedAt: number;
	deployments: Deployment[];
}

export type Role = "Owner" | "Admin" | "Member";

export interface Member {
	id: string;
	workspaceId: string;
	name: string;
	email: string;
	role: Role;
	avatar?: string;
	pending?: boolean;
}

// Shared shape for the deployment timeline (a deployment plus an id).
export interface TimelineItem {
	id: string;
	status: DeploymentStatus;
	message: string;
	branch: string;
	commit: string;
	author: string;
	createdAt: number;
	duration?: number;
}