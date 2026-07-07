<script setup lang="ts">
import { Panel, PanelContent, Button } from "@dlbcodes/ui";
import { PhBell, PhArrowRight } from "@phosphor-icons/vue";
</script>

<template>
    <Panel>
        <PanelContent class="flex flex-col gap-3 p-5">
            <div class="flex items-center gap-2">
                <PhBell class="size-4 text-text-tertiary" aria-hidden="true" />
                <span class="text-sm font-medium text-text-primary"
                    >Alerts</span
                >
            </div>
            <p class="text-sm text-text-secondary">
                Get notified when your projects hit anomalies.
            </p>
            <Button variant="secondary" size="sm" class="w-fit">
                Configure
                <PhArrowRight class="size-4" aria-hidden="true" />
            </Button>
        </PanelContent>
    </Panel>
</template>
