<script setup lang="ts">
import { Switch, Label } from "@dlbcodes/my-design-system";
import { useTheme } from "../composables/useTheme";
import { computed } from "vue";

const { fontMode, setFontMode } = useTheme();
const isMono = computed({
    get: () => fontMode.value === "mono",
    set: (v: boolean) => setFontMode(v ? "mono" : "sans"),
});
</script>

<template>
    <div class="flex items-center gap-2">
        <Label for="mono">Mono</Label>
        <Switch id="mono" v-model="isMono" />
    </div>
</template>
