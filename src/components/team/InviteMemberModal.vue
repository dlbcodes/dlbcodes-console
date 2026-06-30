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
} from "@dlbcodes/my-design-system";

const open = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{ invite: [email: string, role: string] }>();

const email = ref("");
const role = ref("Member");
const error = ref("");

// Reset when the modal opens.
watch(open, (isOpen) => {
    if (isOpen) {
        email.value = "";
        role.value = "Member";
        error.value = "";
    }
});

// Clear the error once the input looks valid again.
watch(email, (value) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) error.value = "";
});

// Validate on submit, not per keystroke.
const onInvite = (): void => {
    const value = email.value.trim();
    if (!value) {
        error.value = "Enter an email address.";
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error.value = "Enter a valid email address.";
        return;
    }
    emit("invite", value, role.value);
    open.value = false;
};
</script>

<template>
    <Modal v-model="open" size="lg">
        <ModalHeader>
            <ModalTitle>Invite member</ModalTitle>
            <ModalDescription>
                Send an invite to add someone to this workspace.
            </ModalDescription>
            <ModalClose />
        </ModalHeader>

        <ModalContent>
            <div class="flex flex-col gap-4">
                <Field :invalid="!!error">
                    <FieldLabel>Email address</FieldLabel>
                    <FieldContent>
                        <Input
                            v-model="email"
                            type="email"
                            placeholder="teammate@example.com"
                            autocomplete="off"
                            @keyup.enter="onInvite"
                        />
                        <FieldError v-if="error">{{ error }}</FieldError>
                    </FieldContent>
                </Field>

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
            </div>
        </ModalContent>

        <ModalFooter>
            <Button variant="secondary" @click="open = false">Cancel</Button>
            <Button variant="primary" @click="onInvite">Send invite</Button>
        </ModalFooter>
    </Modal>
</template>
