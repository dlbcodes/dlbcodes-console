import { ref, computed } from "vue";
import { projects } from "../data/mock";
import { useWorkspace } from "./useWorkspace";
import type { Project } from "../types/console";

// Projects for the active workspace, with reactive search.
export function useProjects() {
	const { active } = useWorkspace();
	const query = ref("");

	const inWorkspace = computed<Project[]>(() =>
		projects.filter((p) => p.workspaceId === active.value.id),
	);

	const filtered = computed<Project[]>(() => {
		const q = query.value.trim().toLowerCase();
		if (!q) return inWorkspace.value;
		return inWorkspace.value.filter(
			(p) =>
				p.name.toLowerCase().includes(q) ||
				p.domain.toLowerCase().includes(q) ||
				p.repo.toLowerCase().includes(q),
		);
	});

	return { query, inWorkspace, filtered };
}