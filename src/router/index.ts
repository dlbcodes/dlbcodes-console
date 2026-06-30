// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/projects",
	},
	{
		path: "/",
		component: AuthLayout,
		children: [
			{
				path: "login",
				name: "login",
				component: () => import("../views/auth/LoginView.vue"),
			},
			{
				path: "signup",
				name: "signup",
				component: () => import("../views/auth/SignupView.vue"),
			},
		],
	},
	{
		path: "/",
		component: AppLayout,
		children: [
			{
				path: "projects",
				name: "projects",
				component: () => import("../views/app/ProjectsView.vue"),
				meta: { title: "Projects" },
			},
			{
				path: "projects/:id",
				name: "project",
				component: () => import("../views/app/ProjectView.vue"),
				meta: { title: "Project" },
			},
			{
				path: "activity",
				name: "activity",
				component: () => import("../views/app/ActivityView.vue"),
				meta: { title: "Activity" },
			},
			{
				path: "team",
				name: "team",
				component: () => import("../views/app/TeamView.vue"),
				meta: { title: "Team" },
			},
			{
				path: "account",
				name: "account",
				component: () => import("../views/app/SettingsView.vue"),
				meta: { title: "Account" },
			},
		],
	},
	{
		path: "/:pathMatch(.*)*",
		name: "not-found",
		component: () => import("../views/NotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;