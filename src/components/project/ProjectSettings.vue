<script setup lang="ts">
import {
    Separator,
    Button,
    Field,
    FieldLabel,
    FieldContent,
    Input,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@dlbcodes/my-design-system";
import { PhWarning } from "@phosphor-icons/vue";
import type { Project } from "../../types/console";

defineProps<{ project: Project }>();

const emit = defineEmits<{ delete: [] }>();
</script>

<template>
    <div class="flex flex-col gap-6">
        <Field>
            <FieldLabel>Project name</FieldLabel>
            <FieldContent>
                <Input :model-value="project.name" />
            </FieldContent>
        </Field>
        <Field>
            <FieldLabel>Framework</FieldLabel>
            <FieldContent>
                <Select :model-value="project.framework">
                    <SelectTrigger>{{ project.framework }}</SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Vue">Vue</SelectItem>
                        <SelectItem value="Nuxt">Nuxt</SelectItem>
                        <SelectItem value="Node">Node</SelectItem>
                        <SelectItem value="VitePress">VitePress</SelectItem>
                    </SelectContent>
                </Select>
            </FieldContent>
        </Field>
        <Field>
            <FieldLabel>Production domain</FieldLabel>
            <FieldContent>
                <Input :model-value="project.domain" />
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
                    Delete project
                </span>
                <span class="text-sm text-text-secondary">
                    Permanently remove this project and all its deployments.
                </span>
            </div>
            <Button variant="destructive" @click="emit('delete')"
                >Delete</Button
            >
        </div>
    </div>
</template>
