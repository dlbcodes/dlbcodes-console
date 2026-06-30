<script setup lang="ts">
import { ref, watch } from "vue";
import { faviconUrl } from "../../utils/favicon";
import internetFallback from "../../assets/icons/internet.png";

const props = withDefaults(defineProps<{ domain: string; size?: number }>(), {
    size: 64,
});

// Start with the favicon; on load error, fall back to the internet icon.
const src = ref(faviconUrl(props.domain, props.size));
const failed = ref(false);

watch(
    () => props.domain,
    (domain) => {
        failed.value = false;
        src.value = faviconUrl(domain, props.size);
    },
);

const onError = (): void => {
    if (!failed.value) {
        failed.value = true;
        src.value = internetFallback;
    }
};
</script>

<template>
    <div
        class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-bg-surface"
    >
        <img
            :src="src"
            alt=""
            class="size-5"
            :class="failed ? 'opacity-60' : ''"
            @error="onError"
        />
    </div>
</template>
