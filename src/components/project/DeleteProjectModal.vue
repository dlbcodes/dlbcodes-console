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
} from "@dlbcodes/ui";

const props = defineProps<{ name: string }>();

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{ confirm: [] }>();

const confirmText = ref("");
const error = ref("");

// Reset the field each time the modal opens for a (possibly different) project.
watch(open, (isOpen) => {
    if (isOpen) {
        confirmText.value = "";
        error.value = "";
    }
});

// Clear the error as soon as the user types the correct value, so it doesn't
// linger after they've fixed it.
watch(confirmText, (value) => {
    if (value.trim() === props.name) error.value = "";
});

// Validate on submit (not per keystroke) so the error doesn't flash while the
// user is still typing the project name.
const onConfirm = (): void => {
    if (confirmText.value.trim() !== props.name) {
        error.value = `Type "${props.name}" exactly to confirm.`;
        return;
    }
    emit("confirm");
    open.value = false;
};
</script>

<template>
    <Modal v-model="open" persistent size="lg">
        <ModalHeader>
            <ModalTitle>Delete project</ModalTitle>
            <ModalDescription>This action cannot be undone.</ModalDescription>
            <ModalClose />
        </ModalHeader>

        <ModalContent>
            <div class="flex flex-col gap-4">
                <p class="text-sm leading-relaxed text-text-secondary">
                    This permanently deletes
                    <span class="font-mono text-text-primary">{{ name }}</span>
                    and all of its deployments.
                </p>

                <Field :invalid="!!error">
                    <FieldLabel>
                        Type
                        <span class="font-mono text-text-primary">{{
                            name
                        }}</span>
                        to confirm
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            v-model="confirmText"
                            :placeholder="name"
                            autocomplete="off"
                            @keyup.enter="onConfirm"
                        />
                        <FieldError v-if="error">{{ error }}</FieldError>
                    </FieldContent>
                </Field>
            </div>
        </ModalContent>

        <ModalFooter>
            <Button variant="secondary" @click="open = false">Cancel</Button>
            <Button variant="destructive" @click="onConfirm">
                Delete project
            </Button>
        </ModalFooter>
    </Modal>
</template>
