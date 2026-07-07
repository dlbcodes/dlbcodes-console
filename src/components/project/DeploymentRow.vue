<script setup lang="ts">
import { PhGitBranch, PhCircle } from "@phosphor-icons/vue";
import { useTimeAgo } from "@vueuse/core";
import { Badge } from "@dlbcodes/ui";
import type { DeploymentStatus } from "../../types/console";

interface Props {
    status: DeploymentStatus;
    message: string;
    branch: string;
    commit: string;
    author: string;
    createdAt: number;
    duration?: number;
    showBadge?: boolean;
}

const props = withDefaults(defineProps<Props>(), { showBadge: true });

const deployColor: Record<DeploymentStatus, string> = {
    ready: "text-success-text",
    building: "text-warning-text",
    queued: "text-warning-text",
    failed: "text-danger-text",
};

const timeAgo = useTimeAgo(() => props.createdAt);
const fmtDuration = (s?: number): string => (s ? `${s}s` : "—");
</script>

<template>
    <div class="flex items-center gap-4">
        <PhCircle
            class="size-2.5 shrink-0"
            weight="fill"
            :class="deployColor[status]"
            aria-hidden="true"
        />
        <div class="flex min-w-0 flex-1 flex-col gap-0.5">
            <div class="flex min-w-0 items-center gap-2">
                <!-- Optional lead-in (e.g. a project link in a cross-project feed) -->
                <slot name="lead" />
                <span
                    class="truncate text-sm"
                    :class="
                        $slots.lead
                            ? 'text-text-secondary'
                            : 'text-text-primary'
                    "
                >
                    {{ message }}
                </span>
            </div>
            <div
                class="flex flex-wrap items-center gap-x-3 font-mono text-xs text-text-tertiary"
            >
                <span class="flex items-center gap-1">
                    <PhGitBranch class="size-3.5" aria-hidden="true" />
                    {{ branch }}
                </span>
                <span>{{ commit }}</span>
                <span>{{ author }}</span>
                <span>{{ fmtDuration(duration) }}</span>
            </div>
        </div>
        <div class="flex shrink-0 flex-col items-end gap-0.5">
            <Badge v-if="showBadge" variant="neutral" class="capitalize">{{
                status
            }}</Badge>
            <span class="font-mono text-xs text-text-tertiary">{{
                timeAgo
            }}</span>
        </div>
    </div>
</template>
