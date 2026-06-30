<script setup lang="ts">
import { computed } from "vue";
import {
    Panel,
    PanelContent,
    Avatar,
    Badge,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
} from "@dlbcodes/my-design-system";
import {
    PhPlus,
    PhDotsThreeVertical,
    PhUserGear,
    PhUserMinus,
} from "@phosphor-icons/vue";
import { members } from "../../data/mock";
import { useWorkspace } from "../../composables/useWorkspace";
import type { Role } from "../../types/console";

const { active } = useWorkspace();

const workspaceMembers = computed(() =>
    members.filter((m) => m.workspaceId === active.value.id),
);

const roleVariant = (role: Role): "primary" | "neutral" =>
    role === "Owner" ? "primary" : "neutral";
</script>

<template>
    <div class="flex flex-col gap-6 px-6 md:px-10 py-8">
        <!-- Toolbar -->
        <div class="flex items-center justify-between gap-3">
            <p class="text-sm text-text-secondary">
                People with access to {{ active.name }}.
            </p>
            <Button variant="primary" size="sm">
                <PhPlus class="size-4" aria-hidden="true" /> Invite member
            </Button>
        </div>

        <!-- Member list -->
        <div class="flex flex-col gap-2">
            <Panel v-for="m in workspaceMembers" :key="m.id">
                <PanelContent class="flex items-center gap-4 p-4">
                    <Avatar
                        :name="m.name || m.email"
                        :src="m.avatar"
                        size="base"
                    />
                    <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                        <div class="flex items-center gap-2">
                            <span
                                class="truncate text-sm font-medium text-text-primary"
                            >
                                {{ m.name || m.email }}
                            </span>
                            <Badge v-if="m.pending" variant="pending"
                                >Pending</Badge
                            >
                        </div>
                        <span
                            class="truncate font-mono text-xs text-text-tertiary"
                            >{{ m.email }}</span
                        >
                    </div>
                    <Badge :variant="roleVariant(m.role)">{{ m.role }}</Badge>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <PhDotsThreeVertical
                                class="size-5"
                                weight="bold"
                                aria-hidden="true"
                            />
                        </DropdownTrigger>
                        <DropdownContent size="fit">
                            <DropdownItem :disabled="m.role === 'Owner'">
                                <PhUserGear class="size-4" aria-hidden="true" />
                                Change role
                            </DropdownItem>
                            <DropdownItem :disabled="m.role === 'Owner'">
                                <PhUserMinus
                                    class="size-4"
                                    aria-hidden="true"
                                />
                                Remove
                            </DropdownItem>
                        </DropdownContent>
                    </Dropdown>
                </PanelContent>
            </Panel>
        </div>
    </div>
</template>
