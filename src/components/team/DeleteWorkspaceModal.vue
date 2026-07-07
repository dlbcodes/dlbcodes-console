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

watch(open, (isOpen) => {
    if (isOpen) {
        confirmText.value = "";
        error.value = "";
    }
});
watch(confirmText, (value) => {
    if (value.trim() === props.name) error.value = "";
});

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
            <ModalTitle>Delete workspace</ModalTitle>
            <ModalDescription>This action cannot be undone.</ModalDescription>
            <ModalClose />
        </ModalHeader>

        <ModalContent>
            <div class="flex flex-col gap-4">
                <p class="text-sm leading-relaxed text-text-secondary">
                    This permanently deletes
                    <span class="font-mono text-text-primary">{{ name }}</span
                    >, including every project and all data.
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
            <Button variant="destructive" @click="onConfirm"
                >Delete workspace</Button
            >
        </ModalFooter>
    </Modal>
</template>
