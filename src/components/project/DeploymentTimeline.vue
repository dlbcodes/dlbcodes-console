<script setup lang="ts" generic="T extends TimelineItem">
import { computed } from "vue";
import { PhGitBranch } from "@phosphor-icons/vue";
import { useTimeAgo } from "@vueuse/core";
import type { DeploymentStatus, TimelineItem } from "../../types/console";

const props = defineProps<{ items: T[] }>();

// Group by day into sections.
const dayLabel = (ts: number): string => {
    const d = new Date(ts);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const sameDay = (a: Date, b: Date): boolean =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
    if (sameDay(d, today)) return "Today";
    if (sameDay(d, yesterday)) return "Yesterday";
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const groups = computed(() => {
    const map = new Map<string, T[]>();
    for (const item of props.items) {
        const key = dayLabel(item.createdAt);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(item);
    }
    return Array.from(map, ([label, items]) => ({ label, items }));
});

const dotColor: Record<DeploymentStatus, string> = {
    ready: "bg-[#22c55e]",
    building: "bg-[#facc15]",
    queued: "bg-[#a1a1aa]",
    failed: "bg-[#ef4444]",
};
const fmtDuration = (s?: number): string => (s ? `${s}s` : "—");
</script>

<template>
    <div class="flex flex-col gap-6 w-full">
        <div
            v-for="group in groups"
            :key="group.label"
            class="flex flex-col gap-1"
        >
            <!-- Date header -->
            <div
                class="mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary"
            >
                {{ group.label }}
            </div>

            <!-- Nodes -->
            <div
                v-for="item in group.items"
                :key="item.id"
                class="relative flex gap-4 pb-6 last:pb-0"
            >
                <!-- Vertical connector line -->
                <div
                    class="absolute bottom-0 left-1.25 top-6 w-px bg-border-subtle"
                    aria-hidden="true"
                ></div>

                <!-- Node dot -->
                <div class="relative z-10 mt-1.5 shrink-0">
                    <span
                        class="block size-2.5 rounded-full ring-4 ring-bg-base"
                        :class="dotColor[item.status]"
                    ></span>
                </div>

                <!-- Content -->
                <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div class="flex items-center gap-2">
                        <!-- Optional lead (e.g. a project link in a cross-project feed) -->
                        <slot name="lead" :item="item" />
                        <span
                            class="truncate text-sm"
                            :class="
                                $slots.lead
                                    ? 'text-text-secondary'
                                    : 'text-text-primary'
                            "
                        >
                            {{ item.message }}
                        </span>
                    </div>
                    <div
                        class="flex flex-wrap items-center gap-x-3 font-mono text-xs text-text-tertiary"
                    >
                        <span class="flex items-center gap-1">
                            <PhGitBranch class="size-3.5" aria-hidden="true" />
                            {{ item.branch }}
                        </span>
                        <span>{{ item.commit }}</span>
                        <span>{{ item.author }}</span>
                        <span>{{ fmtDuration(item.duration) }}</span>
                        <span>·</span>
                        <span>{{
                            useTimeAgo(() => item.createdAt).value
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
