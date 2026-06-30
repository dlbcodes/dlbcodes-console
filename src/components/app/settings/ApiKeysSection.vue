<script setup lang="ts">
import { ref } from "vue";
import {
    Panel,
    PanelContent,
    Button,
    Badge,
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
} from "@dlbcodes/my-design-system";
import {
    PhPlus,
    PhDotsThreeVertical,
    PhArrowsClockwise,
    PhTrash,
} from "@phosphor-icons/vue";
import { useTimeAgo } from "@vueuse/core";
import CreateKeyModal from "./CreateKeyModal.vue";

const MINUTE = 1000 * 60;
const DAY = MINUTE * 60 * 24;
const now = Date.now();

const keys = [
    {
        id: "1",
        name: "Production",
        token: "sk_live_••••••••4f2a",
        env: "Live",
        createdAt: now - 40 * DAY,
    },
    {
        id: "2",
        name: "CI / CD",
        token: "sk_live_••••••••91b7",
        env: "Live",
        createdAt: now - 12 * DAY,
    },
    {
        id: "3",
        name: "Local dev",
        token: "sk_test_••••••••0c3d",
        env: "Test",
        createdAt: now - 3 * DAY,
    },
];

const createOpen = ref(false);
const onCreate = (): void => {
    // Stubbed — a forker persists the new key here.
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
            <p class="text-sm text-text-secondary">
                Keys for authenticating API requests. Keep them secret.
            </p>
            <Button variant="primary" size="sm" @click="createOpen = true">
                <PhPlus class="size-4" aria-hidden="true" />
                Create key
            </Button>
        </div>

        <Panel v-for="k in keys" :key="k.id">
            <PanelContent class="flex items-center gap-4 p-4">
                <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-medium text-text-primary">{{
                            k.name
                        }}</span>
                        <Badge
                            :variant="k.env === 'Live' ? 'primary' : 'neutral'"
                            >{{ k.env }}</Badge
                        >
                    </div>
                    <span class="font-mono text-xs text-text-tertiary">{{
                        k.token
                    }}</span>
                </div>
                <span class="shrink-0 text-xs text-text-tertiary">
                    Created {{ useTimeAgo(k.createdAt).value }}
                </span>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger as-child>
                        <Button variant="icon" size="icon">
                            <PhDotsThreeVertical
                                class="size-5"
                                weight="bold"
                                aria-hidden="true"
                            />
                        </Button>
                    </DropdownTrigger>
                    <DropdownContent size="fit">
                        <DropdownItem>
                            <PhArrowsClockwise
                                class="size-4"
                                aria-hidden="true"
                            />
                            Roll key
                        </DropdownItem>
                        <DropdownItem>
                            <PhTrash class="size-4" aria-hidden="true" /> Revoke
                        </DropdownItem>
                    </DropdownContent>
                </Dropdown>
            </PanelContent>
        </Panel>

        <CreateKeyModal v-model:open="createOpen" @create="onCreate" />
    </div>
</template>
