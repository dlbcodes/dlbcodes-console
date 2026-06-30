<script setup lang="ts">
import { computed } from "vue";
import {
    Panel,
    PanelHeader,
    PanelContent,
    Badge,
} from "@dlbcodes/my-design-system";
import {
    PhTag,
    PhGlobe,
    PhCloud,
    PhClock,
    PhGitBranch,
    PhCircle,
} from "@phosphor-icons/vue";
import { useTimeAgo } from "@vueuse/core";
import type {
    Project,
    ProjectStatus,
    DeploymentStatus,
} from "../../types/console";

const props = defineProps<{ project: Project }>();

const statusColor: Record<ProjectStatus | DeploymentStatus, string> = {
    active: "text-success-text",
    ready: "text-success-text",
    building: "text-warning-text",
    queued: "text-warning-text",
    failed: "text-danger-text",
    paused: "text-text-tertiary",
};

const latest = computed(() => props.project.deployments[0]);
const updatedAgo = useTimeAgo(() => props.project.updatedAt);
const latestAgo = useTimeAgo(() => latest.value?.createdAt ?? 0);
const fmtDuration = (s?: number): string => (s ? `${s}s` : "—");
</script>

<template>
    <div class="flex flex-col gap-6">
        <!-- Stat row -->
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Panel>
                <PanelContent class="flex flex-col gap-1 p-4">
                    <PhTag
                        class="size-6 text-text-secondary"
                        weight="thin"
                        aria-hidden="true"
                    />
                    <span class="text-xs text-text-tertiary">Status</span>
                    <span
                        class="flex items-center gap-1.5 text-sm font-medium text-text-primary"
                    >
                        <PhCircle
                            class="size-2.5"
                            weight="fill"
                            :class="statusColor[project.status]"
                            aria-hidden="true"
                        />
                        <span class="capitalize">{{ project.status }}</span>
                    </span>
                </PanelContent>
            </Panel>
            <Panel>
                <PanelContent class="flex flex-col gap-1 p-4">
                    <PhGlobe
                        class="size-6 text-text-secondary"
                        weight="thin"
                        aria-hidden="true"
                    />
                    <span class="text-xs text-text-tertiary">Region</span>
                    <span
                        class="font-mono text-sm font-medium text-text-primary"
                        >{{ project.region }}</span
                    >
                </PanelContent>
            </Panel>
            <Panel>
                <PanelContent class="flex flex-col gap-1 p-4">
                    <PhCloud
                        class="size-6 text-text-secondary"
                        weight="thin"
                        aria-hidden="true"
                    />
                    <span class="text-xs text-text-tertiary">Deployments</span>
                    <span
                        class="font-mono text-sm font-medium text-text-primary"
                        >{{ project.deployments.length }}</span
                    >
                </PanelContent>
            </Panel>
            <Panel>
                <PanelContent class="flex flex-col gap-1 p-4">
                    <PhClock
                        class="size-6 text-text-secondary"
                        weight="thin"
                        aria-hidden="true"
                    />
                    <span class="text-xs text-text-tertiary">Last updated</span>
                    <span class="text-sm font-medium text-text-primary">{{
                        updatedAgo
                    }}</span>
                </PanelContent>
            </Panel>
        </div>

        <!-- Latest deployment (featured) -->
        <Panel v-if="latest">
            <PanelHeader
                class="flex items-center justify-between px-5 text-sm font-medium text-text-primary"
            >
                Latest deployment
                <Badge variant="neutral" class="font-mono capitalize">{{
                    latest.status
                }}</Badge>
            </PanelHeader>
            <PanelContent class="flex flex-col gap-4 p-5">
                <div class="flex flex-col gap-2 text-sm">
                    <div class="flex items-center gap-2">
                        <PhCircle
                            class="size-2.5 shrink-0"
                            weight="fill"
                            :class="statusColor[latest.status]"
                            aria-hidden="true"
                        />
                        <span class="text-text-primary">{{
                            latest.message
                        }}</span>
                    </div>
                    <div
                        class="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-text-tertiary"
                    >
                        <span class="flex items-center gap-1">
                            <PhGitBranch class="size-3.5" aria-hidden="true" />
                            {{ latest.branch }}
                        </span>
                        <span>{{ latest.commit }}</span>
                        <span>{{ latest.author }}</span>
                        <span>{{ latestAgo }}</span>
                        <span>{{ fmtDuration(latest.duration) }}</span>
                    </div>
                </div>
            </PanelContent>
        </Panel>
    </div>
</template>
