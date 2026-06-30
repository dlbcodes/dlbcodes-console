<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import {
    Panel,
    PanelContent,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsPanels,
    TabsContent,
    Badge,
    Button,
    Separator,
    Field,
    FieldLabel,
    FieldContent,
    Input,
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
import {
    PhArrowSquareOut,
    PhGitBranch,
    PhGlobe,
    PhClockCounterClockwise,
    PhCircle,
    PhArrowClockwise,
    PhWarning,
} from "@phosphor-icons/vue";
import { useTimeAgo } from "@vueuse/core";
import { findProject } from "../../data/mock";
import type { DeploymentStatus, ProjectStatus } from "../../types/console";

const route = useRoute();
const router = useRouter();

const project = computed(() => findProject(route.params.id as string));

const TABS = ["overview", "activity", "settings"] as const;
const activeIndex = computed(() => {
    const i = TABS.indexOf(route.query.tab as (typeof TABS)[number]);
    return i === -1 ? 0 : i;
});
const onTab = (index: number): void => {
    router.replace({ query: { ...route.query, tab: TABS[index] } });
};

const statusColor: Record<ProjectStatus | DeploymentStatus, string> = {
    active: "text-success-text",
    ready: "text-success-text",
    building: "text-warning-text",
    queued: "text-warning-text",
    failed: "text-danger-text",
    paused: "text-text-tertiary",
};

const latest = computed(() => project.value?.deployments[0]);
const fmtDuration = (s?: number): string => (s ? `${s}s` : "—");
</script>

<template>
    <div v-if="project" class="flex flex-col gap-6 px-6 md:px-10 py-8">
        <!-- Header -->
        <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="flex min-w-0 flex-col gap-1">
                <div class="flex items-center gap-2">
                    <h1 class="font-mono text-xl text-text-primary">
                        {{ project.name }}
                    </h1>
                    <Badge variant="pending" class="font-mono">{{
                        project.framework
                    }}</Badge>
                </div>
                <a
                    :href="`https://${project.domain}`"
                    target="_blank"
                    class="flex items-center gap-1 font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                    {{ project.domain }}
                    <PhArrowSquareOut class="size-3.5" aria-hidden="true" />
                </a>
            </div>
            <div class="flex items-center gap-2">
                <Button
                    as="a"
                    :to="`https://${project.domain}`"
                    target="_blank"
                    variant="secondary"
                >
                    <PhGlobe class="size-4" aria-hidden="true" /> Visit
                </Button>
                <Button variant="primary">
                    <PhArrowClockwise class="size-4" aria-hidden="true" />
                    Redeploy
                </Button>
            </div>
        </div>

        <Tabs :selected-index="activeIndex" @change="onTab">
            <TabsList>
                <TabsTrigger>Overview</TabsTrigger>
                <TabsTrigger>Activity</TabsTrigger>
                <TabsTrigger>Settings</TabsTrigger>
            </TabsList>

            <TabsPanels class="mt-6">
                <!-- ── Overview ── -->
                <TabsContent>
                    <div class="flex flex-col gap-6">
                        <!-- Stat row -->
                        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <Panel>
                                <PanelContent class="flex flex-col gap-1 p-4">
                                    <span class="text-xs text-text-tertiary"
                                        >Status</span
                                    >
                                    <span
                                        class="flex items-center gap-1.5 text-sm font-medium text-text-primary"
                                    >
                                        <PhCircle
                                            class="size-2.5"
                                            weight="fill"
                                            :class="statusColor[project.status]"
                                            aria-hidden="true"
                                        />
                                        <span class="capitalize">{{
                                            project.status
                                        }}</span>
                                    </span>
                                </PanelContent>
                            </Panel>
                            <Panel>
                                <PanelContent class="flex flex-col gap-1 p-4">
                                    <span class="text-xs text-text-tertiary"
                                        >Region</span
                                    >
                                    <span
                                        class="font-mono text-sm font-medium text-text-primary"
                                        >{{ project.region }}</span
                                    >
                                </PanelContent>
                            </Panel>
                            <Panel>
                                <PanelContent class="flex flex-col gap-1 p-4">
                                    <span class="text-xs text-text-tertiary"
                                        >Deployments</span
                                    >
                                    <span
                                        class="font-mono text-sm font-medium text-text-primary"
                                        >{{ project.deployments.length }}</span
                                    >
                                </PanelContent>
                            </Panel>
                            <Panel>
                                <PanelContent class="flex flex-col gap-1 p-4">
                                    <span class="text-xs text-text-tertiary"
                                        >Last updated</span
                                    >
                                    <span
                                        class="text-sm font-medium text-text-primary"
                                        >{{
                                            useTimeAgo(project.updatedAt).value
                                        }}</span
                                    >
                                </PanelContent>
                            </Panel>
                        </div>

                        <!-- Latest deployment -->
                        <Panel v-if="latest">
                            <PanelContent class="flex flex-col gap-4 p-5">
                                <div class="flex items-center justify-between">
                                    <span
                                        class="text-sm font-medium text-text-primary"
                                        >Latest deployment</span
                                    >
                                    <Badge
                                        variant="pending"
                                        class="font-mono capitalize"
                                        >{{ latest.status }}</Badge
                                    >
                                </div>
                                <Separator />
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
                                            <PhGitBranch
                                                class="size-3.5"
                                                aria-hidden="true"
                                            />
                                            {{ latest.branch }}
                                        </span>
                                        <span>{{ latest.commit }}</span>
                                        <span>{{ latest.author }}</span>
                                        <span>{{
                                            useTimeAgo(latest.createdAt).value
                                        }}</span>
                                        <span>{{
                                            fmtDuration(latest.duration)
                                        }}</span>
                                    </div>
                                </div>
                            </PanelContent>
                        </Panel>
                    </div>
                </TabsContent>

                <!-- ── Activity (deployments list) ── -->
                <TabsContent>
                    <div class="flex flex-col gap-2">
                        <Panel v-for="d in project.deployments" :key="d.id">
                            <PanelContent class="flex items-center gap-4 p-4">
                                <PhCircle
                                    class="size-2.5 shrink-0"
                                    weight="fill"
                                    :class="statusColor[d.status]"
                                    aria-hidden="true"
                                />
                                <div
                                    class="flex min-w-0 flex-1 flex-col gap-0.5"
                                >
                                    <span
                                        class="truncate text-sm text-text-primary"
                                        >{{ d.message }}</span
                                    >
                                    <div
                                        class="flex flex-wrap items-center gap-x-3 font-mono text-xs text-text-tertiary"
                                    >
                                        <span class="flex items-center gap-1">
                                            <PhGitBranch
                                                class="size-3.5"
                                                aria-hidden="true"
                                            />
                                            {{ d.branch }}
                                        </span>
                                        <span>{{ d.commit }}</span>
                                        <span>{{ d.author }}</span>
                                    </div>
                                </div>
                                <div
                                    class="flex shrink-0 flex-col items-end gap-0.5 font-mono text-xs text-text-tertiary"
                                >
                                    <Badge
                                        variant="pending"
                                        class="capitalize"
                                        >{{ d.status }}</Badge
                                    >
                                    <span>{{
                                        useTimeAgo(d.createdAt).value
                                    }}</span>
                                </div>
                            </PanelContent>
                        </Panel>
                    </div>
                </TabsContent>

                <!-- ── Settings (display only) ── -->
                <TabsContent>
                    <div class="flex flex-col gap-6">
                        <Field>
                            <FieldLabel>Project name</FieldLabel>
                            <FieldContent>
                                <Input :model-value="project.name" />
                            </FieldContent>
                        </Field>
                        <Field>
                            <FieldLabel>Framework</FieldLabel>
                            <FieldContent>
                                <Select :model-value="project.framework">
                                    <SelectTrigger>{{
                                        project.framework
                                    }}</SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Vue">Vue</SelectItem>
                                        <SelectItem value="Nuxt"
                                            >Nuxt</SelectItem
                                        >
                                        <SelectItem value="Node"
                                            >Node</SelectItem
                                        >
                                        <SelectItem value="VitePress"
                                            >VitePress</SelectItem
                                        >
                                    </SelectContent>
                                </Select>
                            </FieldContent>
                        </Field>
                        <Field>
                            <FieldLabel>Production domain</FieldLabel>
                            <FieldContent>
                                <Input :model-value="project.domain" />
                            </FieldContent>
                        </Field>

                        <Separator />

                        <!-- Danger zone -->
                        <div class="flex items-center justify-between gap-4">
                            <div class="flex flex-col gap-0.5">
                                <span
                                    class="flex items-center gap-1.5 text-sm font-medium text-text-primary"
                                >
                                    <PhWarning
                                        class="size-4 text-danger-text"
                                        aria-hidden="true"
                                    />
                                    Delete project
                                </span>
                                <span class="text-sm text-text-secondary">
                                    Permanently remove this project and all its
                                    deployments.
                                </span>
                            </div>
                            <Button variant="destructive">Delete</Button>
                        </div>
                    </div>
                </TabsContent>
            </TabsPanels>
        </Tabs>
    </div>

    <!-- Not found -->
    <Empty v-else class="py-20">
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <PhClockCounterClockwise class="size-5" aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>Project not found</EmptyTitle>
            <EmptyDescription
                >This project doesn't exist or may have been
                deleted.</EmptyDescription
            >
        </EmptyHeader>
        <Button :as="RouterLink" to="/projects" variant="secondary"
            >Back to projects</Button
        >
    </Empty>
</template>
