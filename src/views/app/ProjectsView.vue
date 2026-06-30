<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
    Input,
    Button,
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@dlbcodes/my-design-system";
import { PhMagnifyingGlass, PhPlus, PhFolderOpen } from "@phosphor-icons/vue";
import ProjectCard from "../../components/project/ProjectCard.vue";
import UsagePanel from "../../components/project/UsagePanel.vue";
import AlertsPanel from "../../components/project/AlertsPanel.vue";
import RecentPanel from "../../components/project/RecentPanel.vue";
import DeleteProjectModal from "../../components/project/DeleteProjectModal.vue";
import { useProjects } from "../../composables/useProjects";
import { useUsage } from "../../composables/useUsage";
import type { Project } from "../../types/console";

const router = useRouter();
const { query, filtered } = useProjects();
const { usage, recent } = useUsage();

const open = (id: string): void => {
    router.push(`/projects/${id}`);
};

// Delete modal — single instance owned here, target tracked in a ref.
const deleteOpen = ref(false);
const target = ref<Project | null>(null);

const askDelete = (project: Project): void => {
    target.value = project;
    deleteOpen.value = true;
};
const confirmDelete = (): void => {
    // Stubbed — a forker removes the project from their backend here.
};
</script>

<template>
    <div class="flex flex-col gap-6 px-6 py-8 md:px-10">
        <!-- Toolbar -->
        <div class="flex items-center gap-3">
            <Input
                v-model="query"
                placeholder="Search projects..."
                class="flex-1"
            >
                <PhMagnifyingGlass
                    class="size-4 shrink-0 text-text-tertiary"
                    aria-hidden="true"
                />
            </Input>
            <Button variant="primary">
                <PhPlus class="size-4" aria-hidden="true" />
                New Project
            </Button>
        </div>

        <!-- Two-column split: context sidebar + projects -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_3fr]">
            <!-- Left: context -->
            <div class="flex flex-col gap-4">
                <UsagePanel :usage="usage" />
                <AlertsPanel />
                <RecentPanel :items="recent" />
            </div>

            <!-- Right: projects -->
            <div>
                <div
                    v-if="filtered.length"
                    class="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                    <ProjectCard
                        v-for="p in filtered"
                        :key="p.id"
                        :project="p"
                        @open="open"
                        @delete="askDelete"
                    />
                </div>

                <Empty v-else>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <PhFolderOpen class="size-5" aria-hidden="true" />
                        </EmptyMedia>
                        <template v-if="query">
                            <EmptyTitle>No matching projects</EmptyTitle>
                            <EmptyDescription>
                                No projects match "{{ query }}". Try a different
                                search.
                            </EmptyDescription>
                        </template>
                        <template v-else>
                            <EmptyTitle>No projects yet</EmptyTitle>
                            <EmptyDescription>
                                Create your first project in this workspace to
                                get started.
                            </EmptyDescription>
                        </template>
                    </EmptyHeader>
                    <Button v-if="!query" variant="primary">
                        <PhPlus class="size-4" aria-hidden="true" />
                        New Project
                    </Button>
                </Empty>
            </div>
        </div>

        <DeleteProjectModal
            v-model:open="deleteOpen"
            :name="target?.name ?? ''"
            @confirm="confirmDelete"
        />
    </div>
</template>
