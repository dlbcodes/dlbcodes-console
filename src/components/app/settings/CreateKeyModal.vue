<script setup lang="ts">
import { ref, watch } from "vue";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
    ModalClose,
    Button,
    Field,
    FieldLabel,
    FieldContent,
    FieldError,
    Input,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Alert,
    AlertTitle,
    AlertDescription,
} from "@dlbcodes/ui";
import { PhCopy, PhCheck, PhWarning } from "@phosphor-icons/vue";
import { useClipboard } from "@vueuse/core";

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{ create: [name: string, env: string] }>();

// Two phases: the form, then a one-time reveal of the generated key.
const phase = ref<"form" | "reveal">("form");

const name = ref("");
const env = ref("Test");
const error = ref("");
const createdKey = ref("");

const { copy, copied } = useClipboard({
    source: createdKey,
    copiedDuring: 1500,
});

// Reset everything when the modal opens.
watch(open, (isOpen) => {
    if (isOpen) {
        phase.value = "form";
        name.value = "";
        env.value = "Test";
        error.value = "";
        createdKey.value = "";
    }
});
watch(name, (value) => {
    if (value.trim()) error.value = "";
});

// Fake key generator — a forker replaces this with a real key from the backend.
const randomKey = (envValue: string): string => {
    const prefix = envValue === "Live" ? "sk_live_" : "sk_test_";
    const body = Array.from(
        { length: 32 },
        () =>
            "abcdefghijklmnopqrstuvwxyz0123456789"[
                Math.floor(Math.random() * 36)
            ],
    ).join("");
    return prefix + body;
};

const onCreate = (): void => {
    if (!name.value.trim()) {
        error.value = "Give the key a name.";
        return;
    }
    createdKey.value = randomKey(env.value);
    emit("create", name.value.trim(), env.value);
    phase.value = "reveal";
};
</script>

<template>
    <Modal v-model="open" persistent size="xl">
        <!-- Phase 1: form -->
        <template v-if="phase === 'form'">
            <ModalHeader>
                <ModalTitle>Create API key</ModalTitle>
                <ModalDescription>
                    Name the key and choose an environment.
                </ModalDescription>
                <ModalClose />
            </ModalHeader>

            <ModalContent>
                <div class="flex flex-col gap-4">
                    <Field :invalid="!!error">
                        <FieldLabel>Key name</FieldLabel>
                        <FieldContent>
                            <Input
                                v-model="name"
                                placeholder="e.g. Production"
                                autocomplete="off"
                                @keyup.enter="onCreate"
                            />
                            <FieldError v-if="error">{{ error }}</FieldError>
                        </FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>Environment</FieldLabel>
                        <FieldContent>
                            <Select v-model="env">
                                <SelectTrigger>{{ env }}</SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Test">Test</SelectItem>
                                    <SelectItem value="Live">Live</SelectItem>
                                </SelectContent>
                            </Select>
                        </FieldContent>
                    </Field>
                </div>
            </ModalContent>

            <ModalFooter>
                <Button variant="secondary" @click="open = false"
                    >Cancel</Button
                >
                <Button variant="primary" @click="onCreate">Create key</Button>
            </ModalFooter>
        </template>

        <!-- Phase 2: one-time reveal -->
        <template v-else>
            <ModalHeader>
                <ModalTitle>Save your API key</ModalTitle>
                <ModalDescription>
                    Copy it now. For security, you won't be able to see it
                    again.
                </ModalDescription>
                <ModalClose />
            </ModalHeader>

            <ModalContent>
                <div class="flex flex-col gap-4">
                    <div
                        class="flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-surface p-3"
                    >
                        <code
                            class="min-w-0 flex-1 truncate font-mono text-sm text-text-primary"
                            >{{ createdKey }}</code
                        >
                        <Button
                            variant="secondary"
                            size="icon-sm"
                            :aria-label="copied ? 'Copied' : 'Copy key'"
                            @click="copy()"
                        >
                            <PhCheck
                                v-if="copied"
                                class="size-4 text-success-text"
                                aria-hidden="true"
                            />
                            <PhCopy v-else class="size-4" aria-hidden="true" />
                        </Button>
                    </div>
                    <Alert variant="warning">
                        <template #icon
                            ><PhWarning class="size-4" aria-hidden="true"
                        /></template>
                        <AlertTitle>Store it somewhere safe</AlertTitle>
                        <AlertDescription>
                            This is the only time the full key will be shown.
                        </AlertDescription>
                    </Alert>
                </div>
            </ModalContent>

            <ModalFooter>
                <Button variant="primary" @click="open = false">Done</Button>
            </ModalFooter>
        </template>
    </Modal>
</template>
