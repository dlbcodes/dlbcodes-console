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
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@dlbcodes/ui";

const props = defineProps<{ name: string; currentRole: string }>();

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{ save: [role: string] }>();

const role = ref(props.currentRole);

// Seed the select with the member's current role each time it opens.
watch(open, (isOpen) => {
    if (isOpen) role.value = props.currentRole;
});

const onSave = (): void => {
    emit("save", role.value);
    open.value = false;
};
</script>

<template>
    <Modal v-model="open" size="lg">
        <ModalHeader>
            <ModalTitle>Change role</ModalTitle>
            <ModalDescription>
                Update the role for
                <span class="font-medium text-text-primary">{{ name }}</span
                >.
            </ModalDescription>
            <ModalClose />
        </ModalHeader>

        <ModalContent>
            <Field>
                <FieldLabel>Role</FieldLabel>
                <FieldContent>
                    <Select v-model="role">
                        <SelectTrigger>{{ role }}</SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Member">Member</SelectItem>
                        </SelectContent>
                    </Select>
                </FieldContent>
            </Field>
        </ModalContent>

        <ModalFooter>
            <Button variant="secondary" @click="open = false">Cancel</Button>
            <Button variant="primary" @click="onSave">Save</Button>
        </ModalFooter>
    </Modal>
</template>
