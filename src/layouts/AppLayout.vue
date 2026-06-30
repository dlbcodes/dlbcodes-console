<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";
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
    Separator,
} from "@dlbcodes/my-design-system";
import {
    PhStack,
    PhPulse,
    PhGear,
    PhUsers,
    PhArrowCircleUp,
    PhMagnifyingGlass,
    PhGithubLogo,
} from "@phosphor-icons/vue";
import BrandMark from "../components/BrandMark.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
import UserMenu from "../components/app/UserMenu.vue";
import AppShortcuts from "../components/app/AppShortcuts.vue";
import ShortcutsModal from "../components/app/ShortcutsModal.vue";
import HelpModal from "../components/app/HelpModal.vue";
import CommandPalette from "../components/app/CommandPalette.vue";
import WorkspaceSwitcher from "../components/app/WorkspaceSwitcher.vue";
import { siteConfig } from "../config/site.ts";

const route = useRoute();
const pageTitle = computed(() => (route.meta.title as string) ?? "");

// Top-level navigation. Resources (projects, etc.) live on their own pages,
// not in the sidebar — the sidebar is just navigation.
const nav = [
    { label: "Projects", icon: PhStack, to: "/projects", match: "projects" },
    { label: "Activity", icon: PhPulse, to: "/activity", match: "activity" },
    { label: "Team", icon: PhUsers, to: "/team", match: "team" },
    { label: "Settings", icon: PhGear, to: "/settings", match: "settings" },
];

const commandOpen = ref(false);
const shortcutsOpen = ref(false);
const helpOpen = ref(false);
</script>

<template>
    <SidebarProvider>
        <div class="flex h-dvh">
            <Sidebar>
                <!-- Brand -->
                <SidebarHeader class="flex flex-col gap-4">
                    <div class="flex items-center justify-between w-full">
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
                    <!-- Navigation -->
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
                    </SidebarGroup>
                    <!-- End Navigation -->
                </SidebarContent>

                <!-- Footer -->
                <SidebarFooter>
                    <UserMenu
                        @open-shortcuts="shortcutsOpen = true"
                        @open-help="helpOpen = true"
                    />
                    <Separator class="my-2" />
                    <Button
                        to="/settings?tab=billing"
                        variant="outline"
                        class="group flex w-full items-center bg-bg-raised px-2"
                    >
                        <div class="flex flex-1 items-center gap-x-2">
                            <PhArrowCircleUp
                                class="size-6 shrink-0 group-hover:text-brand-200"
                                aria-hidden="true"
                            />
                            Upgrade to <span class="text-brand-200">Pro</span>
                        </div>
                    </Button>
                    <a
                        href="https://my-design-system-beta.vercel.app/"
                        target="_blank"
                        class="flex justify-center pt-2 text-center text-xs text-text-tertiary transition-colors hover:text-text-primary"
                    >
                        Documentation ↗
                    </a>
                </SidebarFooter>
                <!-- End Footer -->
            </Sidebar>

            <!-- Main area -->
            <div class="flex min-w-0 flex-1 flex-col">
                <header
                    class="flex items-center gap-2 border-b border-border-subtle p-3"
                >
                    <SidebarTrigger />
                    <span
                        class="font-mono text-lg tracking-tight text-text-primary"
                    >
                        {{ pageTitle }}
                    </span>
                    <div class="ml-auto flex items-center gap-x-2">
                        <Button
                            as="a"
                            :to="siteConfig.links.github"
                            target="_blank"
                            variant="icon"
                            size="icon"
                            aria-label="View on GitHub"
                        >
                            <PhGithubLogo />
                        </Button>
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
