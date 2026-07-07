<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSidebar } from "@dlbcodes/ui";
import { useMagicKeys, whenever, useActiveElement } from "@vueuse/core";
import { useWorkspace } from "../../composables/useWorkspace";

const emit = defineEmits<{
    "open-shortcuts": [];
    "open-help": [];
    "open-command": [];
}>();

const route = useRoute();
const router = useRouter();
const { isMobile, close, toggle } = useSidebar();
const { workspaces, setActive } = useWorkspace();

// Close the mobile drawer on any navigation.
watch(
    () => route.fullPath,
    () => {
        if (isMobile.value) close();
    },
);

// Don't fire single-key shortcuts (like "?") while the user is typing.
const activeEl = useActiveElement();
const typing = computed(() => {
    const el = activeEl.value;
    return (
        el?.tagName === "INPUT" ||
        el?.tagName === "TEXTAREA" ||
        el?.isContentEditable === true
    );
});

// Combos we own — prevent the browser default.
const OWNED = [
    (e: KeyboardEvent) =>
        e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey) && !e.shiftKey,
    (e: KeyboardEvent) =>
        e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey),
    (e: KeyboardEvent) => e.key === "," && (e.metaKey || e.ctrlKey),
    (e: KeyboardEvent) =>
        e.key.toLowerCase() === "j" && (e.metaKey || e.ctrlKey),
    (e: KeyboardEvent) => e.key === "?" && !typing.value,
    (e: KeyboardEvent) => /^[1-9]$/.test(e.key) && (e.metaKey || e.ctrlKey),
];

const keys = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (e.type === "keydown" && OWNED.some((match) => match(e))) {
            e.preventDefault();
        }
    },
});

// ⌘B — toggle sidebar
whenever(keys["Meta+B"], toggle);
whenever(keys["Ctrl+B"], toggle);

// ⌘K — command palette
whenever(keys["Meta+K"], () => emit("open-command"));
whenever(keys["Ctrl+K"], () => emit("open-command"));

// ⌘, — account settings
const openAccount = (): void => {
    router.push("/account");
};
whenever(keys["Meta+,"], openAccount);
whenever(keys["Ctrl+,"], openAccount);

// ⌘J — help
whenever(keys["Meta+J"], () => emit("open-help"));
whenever(keys["Ctrl+J"], () => emit("open-help"));

// ? — keyboard shortcuts (guarded while typing)
whenever(keys["?"], () => {
    if (!typing.value) emit("open-shortcuts");
});

// ⌘1 … ⌘9 — switch workspace (matches the Kbd hints in the switcher)
for (let i = 1; i <= 9; i++) {
    const switchTo = (): void => {
        const ws = workspaces[i - 1];
        if (ws) setActive(ws);
    };
    whenever(keys[`Meta+${i}`], switchTo);
    whenever(keys[`Ctrl+${i}`], switchTo);
}
</script>

<template></template>
