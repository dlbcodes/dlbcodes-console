<script setup lang="ts">
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
    ModalClose,
    Button,
} from "@dlbcodes/my-design-system";

defineProps<{ name: string; workspace: string }>();

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{ confirm: [] }>();

const onConfirm = (): void => {
    emit("confirm");
    open.value = false;
};
</script>

<template>
    <Modal v-model="open" persistent size="md">
        <ModalHeader>
            <ModalTitle>Remove member</ModalTitle>
            <ModalDescription>This action cannot be undone.</ModalDescription>

            <ModalClose />
        </ModalHeader>
        <ModalContent class="text-sm leading-relaxed text-text-secondary">
            Remove
            <span class="font-medium text-text-primary">{{ name }}</span>
            from {{ workspace }}? They'll lose access immediately.
        </ModalContent>
        <ModalFooter>
            <Button variant="secondary" @click="open = false">Cancel</Button>
            <Button variant="destructive" @click="onConfirm">Remove</Button>
        </ModalFooter>
    </Modal>
</template>
