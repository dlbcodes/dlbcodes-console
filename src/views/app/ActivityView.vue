<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import {
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
import DeploymentTimeline from "../../components/project/DeploymentTimeline.vue";
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
    <div class="flex w-full flex-col gap-6 px-6 py-8 md:px-10">
        <!-- Toolbar -->
        <div class="flex w-full items-center justify-between gap-3">
            <div class="flex flex-col gap-1">
                <h1 class="text-xl text-text-primary">Activity</h1>
                <p class="text-sm text-text-secondary">
                    Deployments across your projects.
                </p>
            </div>
            <div class="justify-end">
                <Select v-model="statusFilter">
                    <SelectTrigger class="w-40">
                        <span class="capitalize">{{
                            statusFilter === "all"
                                ? "All statuses"
                                : statusFilter
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
        </div>
        <!-- Toolbar -->

        <!-- Timeline -->
        <DeploymentTimeline v-if="feed.length" :items="feed">
            <template #lead="{ item }">
                <RouterLink
                    :to="`/projects/${item.projectId}`"
                    class="shrink-0 font-mono text-sm text-text-primary transition-colors hover:text-brand-200"
                >
                    {{ item.projectName }}
                </RouterLink>
            </template>
        </DeploymentTimeline>
        <!-- End Timeline -->

        <!-- Empty -->
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
        <!-- End Empty -->
    </div>
</template>
