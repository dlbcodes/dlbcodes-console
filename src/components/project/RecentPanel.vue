<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Panel, PanelHeader, PanelContent } from "@dlbcodes/ui";
import { PhGitBranch, PhCircle } from "@phosphor-icons/vue";
import type { DeploymentStatus } from "../../types/console";

interface RecentItem {
    id: string;
    projectId: string;
    projectName: string;
    message: string;
    status: DeploymentStatus;
}

defineProps<{ items: RecentItem[] }>();

const deployColor: Record<DeploymentStatus, string> = {
    ready: "text-success-text",
    building: "text-warning-text",
    queued: "text-warning-text",
    failed: "text-danger-text",
};
</script>

<template>
    <Panel>
        <PanelHeader class="flex items-center gap-2 px-5">
            <PhGitBranch class="size-4 text-text-tertiary" aria-hidden="true" />
            <span class="text-sm font-medium text-text-primary">Recent</span>
        </PanelHeader>
        <PanelContent class="flex flex-col gap-3 p-5">
            <RouterLink
                v-for="d in items"
                :key="d.id"
                :to="`/projects/${d.projectId}`"
                class="flex items-center gap-2 text-xs transition-colors hover:opacity-80"
            >
                <PhCircle
                    class="size-2 shrink-0"
                    weight="fill"
                    :class="deployColor[d.status]"
                    aria-hidden="true"
                />
                <span class="shrink-0 truncate font-mono text-text-primary">{{
                    d.projectName
                }}</span>
                <span class="truncate text-text-tertiary">{{ d.message }}</span>
            </RouterLink>
        </PanelContent>
    </Panel>
</template>
