<script setup lang="ts">
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldDescription,
    Input,
    Button,
    Separator,
    Avatar,
} from "@dlbcodes/ui";
import { currentUser } from "../../../data/mock";

// Display only — a forker wires real persistence.
</script>

<template>
    <div class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
            <Avatar
                :name="currentUser.name"
                :src="currentUser.avatar"
                size="lg"
            />
            <Button variant="secondary" size="sm">Change photo</Button>
        </div>
        <Separator />
        <Field>
            <FieldLabel>Full name</FieldLabel>
            <FieldContent>
                <Input :model-value="currentUser.name" />
            </FieldContent>
        </Field>
        <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
                <Input :model-value="currentUser.email" type="email" />
                <FieldDescription
                    >Used for sign-in and notifications.</FieldDescription
                >
            </FieldContent>
        </Field>
        <div>
            <Button variant="primary">Save changes</Button>
        </div>
    </div>
</template>
