<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    FieldContent,
    Input,
    Badge,
    Button,
    Separator,
} from "@dlbcodes/my-design-system";
import { PhWarning } from "@phosphor-icons/vue";
import { useWorkspace } from "../../composables/useWorkspace";
import DeleteWorkspaceModal from "./DeleteWorkspaceModal.vue";

const { active } = useWorkspace();

const planVariant = (plan: string): "primary" | "neutral" =>
    plan === "Free" ? "neutral" : "primary";

const deleteOpen = ref(false);
const onDelete = (): void => {
    // Stubbed — a forker deletes the workspace here.
};
</script>

<template>
    <div class="flex max-w-xl flex-col gap-6">
        <Field>
            <FieldLabel>Workspace name</FieldLabel>
            <FieldContent>
                <Input :model-value="active.name" />
            </FieldContent>
        </Field>

        <Field>
            <FieldLabel>Plan</FieldLabel>
            <FieldContent>
                <div class="flex items-center gap-2">
                    <Badge :variant="planVariant(active.plan)">{{
                        active.plan
                    }}</Badge>
                    <span class="text-sm text-text-secondary">
                        Manage billing from your account to change the plan.
                    </span>
                </div>
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
                    Delete workspace
                </span>
                <span class="text-sm text-text-secondary">
                    Permanently delete this workspace, its projects, and all
                    data.
                </span>
            </div>
            <Button variant="destructive" @click="deleteOpen = true"
                >Delete</Button
            >
        </div>

        <DeleteWorkspaceModal
            v-model:open="deleteOpen"
            :name="active.name"
            @confirm="onDelete"
        />
    </div>
</template>
