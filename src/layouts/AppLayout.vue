<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import {
    SidebarProvider,
    Sidebar,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarItem,
    SidebarFooter,
    Button,
    Badge,
    Separator,
} from "@dlbcodes/ui";
import {
    PhStack,
    PhPulse,
    PhUsers,
    PhMagnifyingGlass,
    PhGithubLogo,
    PhGlobe,
    PhHardDrives,
    PhFolder,
} from "@phosphor-icons/vue";
import BrandMark from "../components/BrandMark.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
import UserMenu from "../components/app/UserMenu.vue";
import AppShortcuts from "../components/app/AppShortcuts.vue";
import ShortcutsModal from "../components/app/ShortcutsModal.vue";
import HelpModal from "../components/app/HelpModal.vue";
import CommandPalette from "../components/app/CommandPalette.vue";
import WorkspaceSwitcher from "../components/app/WorkspaceSwitcher.vue";
import { projects } from "../data/mock";
import { useWorkspace } from "../composables/useWorkspace";
import FontSwitcher from "../components/FontSwitcher.vue";
import UpgradeCard from "../components/app/UpgradeCard.vue";

const route = useRoute();
const pageTitle = computed(() => (route.meta.title as string) ?? "");
const { active } = useWorkspace();

// Top-level navigation. The sidebar is navigation; resources live on their pages.
const nav = [
    { label: "Projects", icon: PhStack, to: "/projects", match: "projects" },
    { label: "Activity", icon: PhPulse, to: "/activity", match: "activity" },
    { label: "Team", icon: PhUsers, to: "/team", match: "team" },
];

// Not built yet
const soon = [
    { label: "Domains", icon: PhGlobe },
    { label: "Storage", icon: PhHardDrives },
];

const recentProjects = computed(() =>
    projects
        .filter((p) => p.workspaceId === active.value.id)
        .slice()
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, 4),
);

const commandOpen = ref(false);
const shortcutsOpen = ref(false);
const helpOpen = ref(false);
</script>

<template>
    <SidebarProvider>
        <div class="flex h-dvh bg-bg-surface">
            <Sidebar class="border-0">
                <!-- Brand -->
                <SidebarHeader class="flex flex-col gap-4">
                    <div class="flex w-full items-center justify-between">
                        <BrandMark />
                        <Button
                            variant="secondary"
                            size="icon"
                            class="hidden md:flex"
                            aria-label="Open command palette"
                            @click="commandOpen = true"
                        >
                            <PhMagnifyingGlass
                                class="size-4"
                                aria-hidden="true"
                            />
                        </Button>
                    </div>
                    <WorkspaceSwitcher />
                </SidebarHeader>
                <!-- End Brand -->

                <SidebarContent>
                    <!-- Main nav -->
                    <SidebarGroup>
                        <SidebarItem
                            v-for="item in nav"
                            :key="item.to"
                            :as="RouterLink"
                            :to="item.to"
                            :active="route.path.startsWith(item.to)"
                        >
                            <component
                                :is="item.icon"
                                class="size-4 shrink-0"
                                aria-hidden="true"
                            />
                            <span class="flex-1">{{ item.label }}</span>
                        </SidebarItem>

                        <!-- Coming soon (disabled) -->
                        <SidebarItem
                            v-for="item in soon"
                            :key="item.label"
                            as="button"
                            disabled
                        >
                            <component
                                :is="item.icon"
                                class="size-4 shrink-0"
                                aria-hidden="true"
                            />
                            <span class="flex-1 text-left">{{
                                item.label
                            }}</span>
                            <Badge variant="neutral">Soon</Badge>
                        </SidebarItem>
                    </SidebarGroup>

                    <!-- Recent projects -->
                    <SidebarGroup label="Recent projects" class="pt-6">
                        <SidebarItem
                            v-for="p in recentProjects"
                            :key="p.id"
                            :as="RouterLink"
                            :to="`/projects/${p.id}`"
                            :active="route.params.id === p.id"
                        >
                            <PhFolder
                                class="size-4 shrink-0"
                                aria-hidden="true"
                            />
                            <span class="flex-1 truncate font-mono text-xs">{{
                                p.name
                            }}</span>
                        </SidebarItem>
                    </SidebarGroup>
                </SidebarContent>

                <!-- Footer -->
                <SidebarFooter>
                    <UpgradeCard />

                    <Separator class="my-2" />

                    <UserMenu
                        @open-shortcuts="shortcutsOpen = true"
                        @open-help="helpOpen = true"
                    />

                    <a
                        href="https://ui.dlbcodes.com"
                        target="_blank"
                        class="flex justify-center pt-2 text-center text-xs text-text-tertiary transition-colors hover:text-text-primary"
                    >
                        Documentation ↗
                    </a>
                </SidebarFooter>
                <!-- End Footer -->
            </Sidebar>

            <!-- Main area -->
            <div
                class="relative mt-0 flex min-h-0 flex-1 flex-col overflow-hidden rounded-none bg-bg-base shadow-md md:mt-2 md:rounded-tl-2xl"
            >
                <header
                    class="flex shrink-0 items-center gap-2 border-b border-border-subtle p-2"
                >
                    <SidebarTrigger />
                    <span
                        class="font-mono text-base tracking-tight text-text-primary"
                    >
                        {{ pageTitle }}
                    </span>
                    <div class="ml-auto flex items-center gap-x-2">
                        <Button
                            as="a"
                            to="https://github.com/dlbcodes/dlbcodes-console"
                            target="_blank"
                            variant="icon"
                            size="icon"
                            aria-label="View on GitHub"
                        >
                            <PhGithubLogo />
                        </Button>
                        <FontSwitcher />
                        <ThemeSwitcher />
                    </div>
                </header>

                <main class="min-h-0 flex-1 overflow-auto">
                    <router-view />
                </main>
            </div>
            <!-- End Main area -->
        </div>

        <AppShortcuts
            @open-shortcuts="shortcutsOpen = true"
            @open-help="helpOpen = true"
            @open-command="commandOpen = true"
        />
    </SidebarProvider>

    <ShortcutsModal v-model:open="shortcutsOpen" />
    <HelpModal v-model:open="helpOpen" />

    <CommandPalette
        v-model:open="commandOpen"
        @open-shortcuts="shortcutsOpen = true"
        @open-help="helpOpen = true"
    />
</template>
