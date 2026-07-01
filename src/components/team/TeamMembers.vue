<script setup lang="ts">
import { computed, ref } from "vue";
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
import InviteMemberModal from "./InviteMemberModal.vue";
import ChangeRoleModal from "./ChangeRoleModal.vue";
import RemoveMemberModal from "./RemoveMemberModal.vue";
import { members } from "../../data/mock";
import { useWorkspace } from "../../composables/useWorkspace";
import type { Role, Member } from "../../types/console";

const { active } = useWorkspace();

const workspaceMembers = computed(() =>
    members.filter((m) => m.workspaceId === active.value.id),
);

const roleVariant = (role: Role): "primary" | "neutral" =>
    role === "Owner" ? "primary" : "neutral";

const inviteOpen = ref(false);
const onInvite = (): void => {
    // Stubbed — a forker sends the real invite here.
};

const target = ref<Member | null>(null);
const roleOpen = ref(false);
const removeOpen = ref(false);

const askChangeRole = (member: Member): void => {
    target.value = member;
    roleOpen.value = true;
};
const askRemove = (member: Member): void => {
    target.value = member;
    removeOpen.value = true;
};

const onSaveRole = (): void => {
    // Stubbed — a forker persists the new role here.
};
const onRemove = (): void => {
    // Stubbed — a forker removes the member here.
};
</script>

<template>
    <div class="flex flex-col gap-6">
        <!-- Toolbar -->
        <div class="flex items-center justify-between gap-3">
            <p class="text-sm text-text-secondary">
                People with access to {{ active.name }}.
            </p>
            <Button variant="primary" size="sm" @click="inviteOpen = true">
                <PhPlus class="size-4" aria-hidden="true" />
                <span class="md:hidden">Invite</span>
                <span class="hidden md:inline">Invite member</span>
            </Button>
        </div>

        <!-- Member list -->
        <div class="flex flex-col gap-2">
            <Panel
                v-for="m in workspaceMembers"
                :key="m.id"
                class="overflow-visible"
            >
                <PanelContent
                    class="flex items-center gap-4 overflow-visible p-4"
                >
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
                            <Badge v-if="m.pending" variant="pending">
                                Pending
                            </Badge>
                        </div>
                        <span
                            class="truncate font-mono text-xs text-text-tertiary"
                        >
                            {{ m.email }}
                        </span>
                    </div>
                    <Badge :variant="roleVariant(m.role)">{{ m.role }}</Badge>
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
                            <DropdownItem
                                :disabled="m.role === 'Owner'"
                                class="whitespace-nowrap"
                                @click="askChangeRole(m)"
                            >
                                <PhUserGear class="size-4" aria-hidden="true" />
                                Change role
                            </DropdownItem>
                            <DropdownItem
                                :disabled="m.role === 'Owner'"
                                @click="askRemove(m)"
                            >
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

        <InviteMemberModal v-model:open="inviteOpen" @invite="onInvite" />
        <ChangeRoleModal
            v-model:open="roleOpen"
            :name="target?.name || target?.email || ''"
            :current-role="target?.role ?? 'Member'"
            @save="onSaveRole"
        />
        <RemoveMemberModal
            v-model:open="removeOpen"
            :name="target?.name || target?.email || ''"
            :workspace="active.name"
            @confirm="onRemove"
        />
    </div>
</template>
