import { computed } from "vue";
import { useWorkspace } from "./useWorkspace";
import { projects } from "../data/mock";

export interface UsageMetric {
	label: string;
	used: string;
	limit: string;
	pct: number;
}

export function useUsage() {
	const { active } = useWorkspace();

	const usage = computed<UsageMetric[]>(() => {
		const heavy = active.value.id === "dlbcodes";
		return [
			{ label: "Edge Requests", used: heavy ? "847K" : "62K", limit: "1M", pct: heavy ? 85 : 6 },
			{ label: "Function Invocations", used: heavy ? "612K" : "31K", limit: "1M", pct: heavy ? 61 : 3 },
			{ label: "Fast Data Transfer", used: heavy ? "74.2 GB" : "2.5 GB", limit: "100 GB", pct: heavy ? 74 : 3 },
			{ label: "Image Optimization", used: heavy ? "4.6K" : "229", limit: "5K", pct: heavy ? 92 : 5 },
		];
	});

	const recent = computed(() =>
		projects
			.filter((p) => p.workspaceId === active.value.id)
			.flatMap((p) =>
				p.deployments.map((d) => ({
					id: d.id,
					projectId: p.id,
					projectName: p.name,
					message: d.message,
					status: d.status,
					createdAt: d.createdAt,
				})),
			)
			.sort((a, b) => b.createdAt - a.createdAt)
			.slice(0, 4),
	);

	return { usage, recent };
}