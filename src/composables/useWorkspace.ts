import { ref } from "vue";
import { workspaces } from "../data/mock";
import type { Workspace } from "../types/console";

// Module-level ref → shared across every component that calls useWorkspace().
// This is the single source of truth for which workspace is active.
const active = ref<Workspace>(workspaces[0]);

export function useWorkspace() {
	const setActive = (ws: Workspace): void => {
		active.value = ws;
	};
	return { active, workspaces, setActive };
}