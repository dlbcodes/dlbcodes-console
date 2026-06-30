<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import {
    Panel,
    PanelContent,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@dlbcodes/my-design-system";
import { PhPulse } from "@phosphor-icons/vue";
import DeploymentRow from "../../components/project/DeploymentRow.vue";
import { projects } from "../../data/mock";
import { useWorkspace } from "../../composables/useWorkspace";
import type { Deployment, DeploymentStatus } from "../../types/console";

const { active } = useWorkspace();

interface FeedItem extends Deployment {
    projectId: string;
    projectName: string;
}

const allDeployments = computed<FeedItem[]>(() =>
    projects
        .filter((p) => p.workspaceId === active.value.id)
        .flatMap((p) =>
            p.deployments.map((d) => ({
                ...d,
                projectId: p.id,
                projectName: p.name,
            })),
        )
        .sort((a, b) => b.createdAt - a.createdAt),
);

const statusFilter = ref<"all" | DeploymentStatus>("all");

const feed = computed<FeedItem[]>(() =>
    statusFilter.value === "all"
        ? allDeployments.value
        : allDeployments.value.filter((d) => d.status === statusFilter.value),
);
</script>

<template>
    <div class="flex flex-col gap-6 px-6 py-8 md:px-10">
        <!-- Toolbar -->
        <div class="flex items-center justify-between gap-3 w-full">
            <p class="text-sm text-text-secondary">
                Deployments across your projects.
            </p>
            <Select v-model="statusFilter" class="">
                <SelectTrigger class="w-40">
                    <span class="capitalize">{{
                        statusFilter === "all" ? "All statuses" : statusFilter
                    }}</span>
                </SelectTrigger>
                <SelectContent width="3xs">
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="building">Building</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <!-- Feed -->
        <div v-if="feed.length" class="flex flex-col gap-2">
            <Panel v-for="d in feed" :key="d.id">
                <PanelContent class="p-4">
                    <DeploymentRow
                        :status="d.status"
                        :message="d.message"
                        :branch="d.branch"
                        :commit="d.commit"
                        :author="d.author"
                        :created-at="d.createdAt"
                        :duration="d.duration"
                    >
                        <template #lead>
                            <RouterLink
                                :to="`/projects/${d.projectId}`"
                                class="shrink-0 font-mono text-sm text-text-primary transition-colors hover:text-brand-200"
                            >
                                {{ d.projectName }}
                            </RouterLink>
                        </template>
                    </DeploymentRow>
                </PanelContent>
            </Panel>
        </div>

        <!-- Empty (filtered to nothing) -->
        <Empty v-else>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <PhPulse class="size-5" aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>No deployments</EmptyTitle>
                <EmptyDescription>
                    No deployments match this filter.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    </div>
</template>
