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
import { PhUser, PhKey, PhCreditCard } from "@phosphor-icons/vue";
import ProfileSection from "../../components/app/settings/ProfileSection.vue";
import ApiKeysSection from "../../components/app/settings/ApiKeysSection.vue";
import BillingSection from "../../components/app/settings/BillingSection.vue";

const route = useRoute();
const router = useRouter();

const TABS = ["profile", "keys", "billing"] as const;
const activeIndex = computed(() => {
    const i = TABS.indexOf(route.query.tab as (typeof TABS)[number]);
    return i === -1 ? 0 : i;
});
const onChange = (index: number): void => {
    router.replace({ query: { ...route.query, tab: TABS[index] } });
};
</script>

<template>
    <div class="flex flex-col gap-6 px-6 md:px-10 py-8">
        <div class="flex flex-col gap-1">
            <h1 class="font-mono text-xl text-text-primary">Settings</h1>
            <p class="text-sm text-text-secondary">
                Manage your account, API keys, and billing.
            </p>
        </div>

        <Tabs :selected-index="activeIndex" @change="onChange">
            <TabsList
                class="w-full max-w-full justify-start overflow-x-auto [&>*]:shrink-0"
            >
                <TabsTrigger>
                    <PhUser class="size-4" aria-hidden="true" /> Profile
                </TabsTrigger>
                <TabsTrigger>
                    <PhKey class="size-4" aria-hidden="true" /> API Keys
                </TabsTrigger>
                <TabsTrigger>
                    <PhCreditCard class="size-4" aria-hidden="true" /> Billing
                </TabsTrigger>
            </TabsList>

            <TabsPanels class="mt-8">
                <TabsContent><ProfileSection /></TabsContent>
                <TabsContent><ApiKeysSection /></TabsContent>
                <TabsContent><BillingSection /></TabsContent>
            </TabsPanels>
        </Tabs>
    </div>
</template>
