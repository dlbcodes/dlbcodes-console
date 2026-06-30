<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsPanels,
    TabsContent,
    Button,
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@dlbcodes/my-design-system";
import {
    PhSquaresFour,
    PhPulse,
    PhGear,
    PhArrowSquareOut,
    PhGlobe,
    PhArrowClockwise,
    PhClockCounterClockwise,
} from "@phosphor-icons/vue";
import { getFrameworkLogo } from "../../utils/frameworks";
import ProjectOverviewTab from "../../components/project/ProjectOverview.vue";
import ProjectActivityTab from "../../components/project/ProjectActivity.vue";
import ProjectSettingsTab from "../../components/project/ProjectSettings.vue";
import DeleteProjectModal from "../../components/project/DeleteProjectModal.vue";
import { findProject } from "../../data/mock";

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

const logo = computed(() =>
    project.value ? getFrameworkLogo(project.value.framework) : undefined,
);

const deleteOpen = ref(false);
const onDelete = (): void => {
    // Stubbed — a forker removes the project, then navigate away.
    router.push("/projects");
};
</script>

<template>
    <div v-if="project" class="flex flex-col gap-6 px-6 py-8 md:px-10">
        <!-- Header -->
        <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="flex min-w-0 flex-col gap-1">
                <div class="flex items-center gap-2">
                    <h1 class="font-mono text-xl text-text-primary">
                        {{ project.name }}
                    </h1>
                    <span
                        class="flex items-center gap-1 font-mono text-xs text-text-tertiary"
                    >
                        <img
                            v-if="logo"
                            :src="logo"
                            :alt="`${project.framework} logo`"
                            class="size-3.5"
                        />
                        {{ project.framework }}
                    </span>
                </div>
                <a
                    :href="`https://${project.domain}`"
                    target="_blank"
                    rel="noopener"
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
                <TabsTrigger>
                    <PhSquaresFour class="size-4" aria-hidden="true" />
                    Overview
                </TabsTrigger>
                <TabsTrigger>
                    <PhPulse class="size-4" aria-hidden="true" />
                    Activity
                </TabsTrigger>
                <TabsTrigger>
                    <PhGear class="size-4" aria-hidden="true" />
                    Settings
                </TabsTrigger>
            </TabsList>

            <TabsPanels class="mt-6 w-full max-w-4xl">
                <TabsContent>
                    <ProjectOverviewTab :project="project" />
                </TabsContent>
                <TabsContent>
                    <ProjectActivityTab :project="project" />
                </TabsContent>
                <TabsContent>
                    <ProjectSettingsTab
                        :project="project"
                        @delete="deleteOpen = true"
                    />
                </TabsContent>
            </TabsPanels>
        </Tabs>

        <DeleteProjectModal
            v-model:open="deleteOpen"
            :name="project.name"
            @confirm="onDelete"
        />
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
