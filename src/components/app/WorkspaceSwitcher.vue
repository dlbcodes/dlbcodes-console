<script setup lang="ts">
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Avatar,
    Badge,
    Kbd,
    Separator,
    Button,
} from "@dlbcodes/my-design-system";
import { PhCaretUpDown, PhCheck, PhPlus, PhGear } from "@phosphor-icons/vue";
import { useRouter } from "vue-router";
import { useWorkspace } from "../../composables/useWorkspace";
import type { Workspace, WorkspacePlan } from "../../types/console";

const router = useRouter();

// Shared state — selecting here updates every view that reads useWorkspace().
const { active, workspaces, setActive } = useWorkspace();

const select = (ws: Workspace, close: () => void): void => {
    setActive(ws);
    close();
};

const planVariant = (plan: WorkspacePlan): "primary" | "pending" =>
    plan === "Free" ? "pending" : "primary";
</script>

<template>
    <Popover placement="bottom-start" class="w-full">
        <PopoverTrigger class="w-full" as-child>
            <Button
                variant="secondary"
                class="h-fit w-full justify-between px-2 py-2 text-left"
            >
                <span class="flex min-w-0 items-center gap-2">
                    <Avatar :name="active.name" :src="null" size="sm" />
                    <span class="flex min-w-0 flex-col">
                        <span
                            class="truncate text-sm font-medium text-text-primary"
                        >
                            {{ active.name }}
                        </span>
                        <span
                            class="truncate font-mono text-xs text-text-tertiary"
                        >
                            {{ active.plan }}
                        </span>
                    </span>
                </span>
                <PhCaretUpDown
                    class="size-4 shrink-0 text-text-tertiary"
                    aria-hidden="true"
                />
            </Button>
        </PopoverTrigger>

        <PopoverContent size="sm">
            <template #default="{ close }">
                <div class="flex flex-col gap-0.5 p-1">
                    <div
                        class="px-2 py-1.5 text-xs font-medium text-text-tertiary"
                    >
                        Workspaces
                    </div>

                    <button
                        v-for="(ws, i) in workspaces"
                        :key="ws.id"
                        type="button"
                        class="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-bg-surface"
                        @click="select(ws, close)"
                    >
                        <Avatar :name="ws.name" :src="null" size="sm" />
                        <span
                            class="flex-1 truncate text-sm font-medium text-text-primary"
                        >
                            {{ ws.name }}
                        </span>
                        <Badge :variant="planVariant(ws.plan)">{{
                            ws.plan
                        }}</Badge>
                        <PhCheck
                            v-if="ws.id === active.id"
                            class="size-4 text-brand-200"
                            aria-hidden="true"
                        />
                        <Kbd v-else>⌘{{ i + 1 }}</Kbd>
                    </button>

                    <Separator class="my-1" />

                    <button
                        type="button"
                        class="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-text-primary transition-colors hover:bg-bg-surface"
                        @click="
                            () => {
                                close();
                                router.push('/team');
                            }
                        "
                    >
                        <PhGear class="size-4" aria-hidden="true" />
                        Workspace settings
                    </button>

                    <button
                        type="button"
                        class="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-text-primary transition-colors hover:bg-bg-surface"
                        @click="close"
                    >
                        <PhPlus class="size-4" aria-hidden="true" />
                        Create workspace
                    </button>
                </div>
            </template>
        </PopoverContent>
    </Popover>
</template>
