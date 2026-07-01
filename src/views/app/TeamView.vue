<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsPanels,
    TabsContent,
} from "@dlbcodes/my-design-system";
import { PhUsers, PhGear } from "@phosphor-icons/vue";
import TeamMembers from "../../components/team/TeamMembers.vue";
import TeamSettings from "../../components/team/TeamSettings.vue";

const route = useRoute();
const router = useRouter();

const TABS = ["members", "settings"] as const;
const activeIndex = computed(() => {
    const i = TABS.indexOf(route.query.tab as (typeof TABS)[number]);
    return i === -1 ? 0 : i;
});
const onChange = (index: number): void => {
    router.replace({ query: { ...route.query, tab: TABS[index] } });
};
</script>

<template>
    <div class="flex flex-col gap-6 px-6 py-8 md:px-10">
        <div class="flex flex-col gap-1">
            <h1 class="text-xl text-text-primary">Team</h1>
            <p class="text-sm text-text-secondary">
                Manage members and workspace settings.
            </p>
        </div>

        <Tabs :selected-index="activeIndex" @change="onChange">
            <TabsList class="justify-start overflow-x-auto *:shrink-0">
                <TabsTrigger>
                    <PhUsers class="size-4" aria-hidden="true" />
                    Members
                </TabsTrigger>
                <TabsTrigger>
                    <PhGear class="size-4" aria-hidden="true" />
                    Settings
                </TabsTrigger>
            </TabsList>

            <TabsPanels class="mt-6 w-full max-w-3xl">
                <TabsContent>
                    <TeamMembers />
                </TabsContent>
                <TabsContent>
                    <TeamSettings />
                </TabsContent>
            </TabsPanels>
        </Tabs>
    </div>
</template>
