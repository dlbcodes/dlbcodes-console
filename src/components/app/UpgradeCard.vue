<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Button } from "@dlbcodes/ui";
import { PhArrowCircleUp } from "@phosphor-icons/vue";
</script>

<template>
    <div
        class="flex flex-col gap-2 rounded-xl border border-border-subtle bg-bg-raised p-3"
    >
        <div class="flex items-center gap-2">
            <PhArrowCircleUp
                class="size-5 shrink-0 text-brand-200"
                aria-hidden="true"
            />
            <span class="text-sm font-medium text-text-primary"
                >Upgrade to Pro</span
            >
        </div>
        <p class="text-xs leading-relaxed text-text-secondary">
            Higher limits, team seats and priority builds
        </p>
        <Button
            :as="RouterLink"
            to="/account?tab=billing"
            variant="primary"
            size="sm"
        >
            Upgrade to Pro
        </Button>
    </div>
</template>
