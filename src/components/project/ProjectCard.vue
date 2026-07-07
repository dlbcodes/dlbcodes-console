<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import {
    Panel,
    PanelContent,
    Badge,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
} from "@dlbcodes/ui";
import {
    PhGitBranch,
    PhCircle,
    PhGithubLogo,
    PhDotsThreeVertical,
    PhArrowSquareOut,
    PhGearSix,
    PhTrash,
} from "@phosphor-icons/vue";
import { useTimeAgo } from "@vueuse/core";
import { getFrameworkLogo } from "../../utils/frameworks";
import { faviconUrl } from "../../utils/favicon";
import type { Project, ProjectStatus } from "../../types/console";

const props = defineProps<{ project: Project }>();

const emit = defineEmits<{
    open: [id: string];
    delete: [project: Project];
}>();

const router = useRouter();

const statusColor: Record<ProjectStatus, string> = {
    active: "text-success-text",
    building: "text-warning-text",
    failed: "text-danger-text",
    paused: "text-text-tertiary",
};

const logo = computed(() => getFrameworkLogo(props.project.framework));
const latest = props.project.deployments[0];
const timeAgo = useTimeAgo(() => props.project.updatedAt);

const visitSite = (): void => {
    window.open(`https://${props.project.domain}`, "_blank", "noopener");
};
const goToSettings = (): void => {
    router.push(`/projects/${props.project.id}?tab=settings`);
};
</script>

<template>
    <Panel
        class="cursor-pointer transition-colors hover:border-border-default"
        @click="emit('open', project.id)"
    >
        <PanelContent class="flex flex-col gap-4 p-5 hover:bg-bg-surface/20">
            <!-- Header -->
            <div class="flex items-start gap-3">
                <div
                    class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                >
                    <img
                        :src="faviconUrl(project.domain)"
                        alt=""
                        class="size-7"
                    />
                </div>

                <div class="flex min-w-0 flex-1 flex-col">
                    <span class="truncate font-medium text-text-primary">{{
                        project.name
                    }}</span>
                    <a
                        :href="`https://${project.domain}`"
                        target="_blank"
                        rel="noopener"
                        class="flex items-center gap-1 truncate font-mono text-xs text-text-tertiary transition-colors hover:text-text-secondary"
                        @click.stop
                    >
                        {{ project.domain }}
                        <PhArrowSquareOut
                            class="size-3 shrink-0"
                            aria-hidden="true"
                        />
                    </a>
                </div>

                <Dropdown placement="bottom-end">
                    <DropdownTrigger @click.stop.prevent as-child>
                        <Button variant="icon" size="icon">
                            <PhDotsThreeVertical
                                class="size-5"
                                weight="bold"
                                aria-hidden="true"
                            />
                        </Button>
                    </DropdownTrigger>
                    <DropdownContent size="fit">
                        <DropdownItem @click.stop="visitSite">
                            <PhArrowSquareOut
                                class="size-4"
                                aria-hidden="true"
                            />
                            Open
                        </DropdownItem>
                        <DropdownItem @click.stop="goToSettings">
                            <PhGearSix class="size-4" aria-hidden="true" />
                            Settings
                        </DropdownItem>
                        <DropdownItem @click.stop="emit('delete', project)">
                            <PhTrash class="size-4" aria-hidden="true" /> Delete
                        </DropdownItem>
                    </DropdownContent>
                </Dropdown>
            </div>
            <!-- End Header -->

            <!-- Repo -->
            <div class="flex items-center gap-2">
                <Badge variant="neutral" class="gap-1.5 font-mono">
                    <PhGithubLogo
                        class="size-3.5 shrink-0"
                        aria-hidden="true"
                    />
                    <span class="truncate">{{ project.repo }}</span>
                </Badge>
                <span
                    class="flex items-center gap-1 font-mono text-xs text-text-tertiary"
                    :title="project.framework"
                >
                    <img
                        v-if="logo"
                        :src="logo"
                        :alt="`${project.framework} logo`"
                        class="size-3.5 shrink-0"
                    />
                    {{ project.framework }}
                </span>
            </div>
            <!-- End Repo -->

            <!-- Latest deployment -->
            <div
                class="flex items-center gap-2 pt-1 text-xs text-text-secondary"
            >
                <PhCircle
                    class="size-2.5 shrink-0"
                    weight="fill"
                    :class="statusColor[project.status]"
                    aria-hidden="true"
                />
                <span
                    class="min-w-0 flex-1 truncate font-medium text-text-primary"
                >
                    {{ latest?.message ?? "No deployments yet" }}
                </span>
            </div>
            <!-- End Latest deployment -->

            <!--  branch + time ago -->
            <div class="flex items-center gap-3 text-xs text-text-tertiary">
                <span class="flex items-center gap-1 font-mono">
                    <PhGitBranch class="size-3.5" aria-hidden="true" />
                    {{ latest?.branch ?? "main" }}
                </span>
                <span>{{ timeAgo }}</span>
            </div>
            <!--  End branch + time ago -->
        </PanelContent>
    </Panel>
</template>
