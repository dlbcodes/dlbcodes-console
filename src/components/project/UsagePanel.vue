<script setup lang="ts">
import { Panel, PanelHeader, PanelContent, Progress } from "@dlbcodes/ui";
import { PhChartLineUp } from "@phosphor-icons/vue";

interface UsageMetric {
    label: string;
    used: string;
    limit: string;
    pct: number;
}

defineProps<{ usage: UsageMetric[] }>();

type UsageLevel = "normal" | "warning" | "danger";

// Color by how close to the limit: 90%+ danger, 80-89% warning, else normal.
const levelOf = (pct: number): UsageLevel => {
    if (pct >= 90) return "danger";
    if (pct >= 80) return "warning";
    return "normal";
};

// The usage number (our own text).
const numberClass: Record<UsageLevel, string> = {
    normal: "text-text-tertiary",
    warning: "text-warning-text",
    danger: "text-danger-text",
};

// The progress bar — class merges onto the track, so target the inner fill
// div ([&>div]) to recolor the filled portion rather than the rail.
const barClass: Record<UsageLevel, string> = {
    normal: "",
    warning: "[&>div]:bg-warning-text",
    danger: "[&>div]:bg-danger-text",
};
</script>

<template>
    <Panel>
        <PanelHeader class="flex items-center gap-2 px-5">
            <PhChartLineUp
                class="size-4 text-text-tertiary"
                aria-hidden="true"
            />
            <span class="text-sm font-medium text-text-primary">Usage</span>
        </PanelHeader>
        <PanelContent class="flex flex-col gap-4 p-5">
            <div
                v-for="u in usage"
                :key="u.label"
                class="flex flex-col gap-1.5"
            >
                <div class="flex items-center justify-between text-xs">
                    <span class="text-text-secondary">{{ u.label }}</span>
                    <span
                        class="font-mono"
                        :class="numberClass[levelOf(u.pct)]"
                    >
                        {{ u.used }} / {{ u.limit }}
                    </span>
                </div>
                <Progress
                    :value="u.pct"
                    :label="`${u.label} usage`"
                    :class="barClass[levelOf(u.pct)]"
                />
            </div>
        </PanelContent>
    </Panel>
</template>
