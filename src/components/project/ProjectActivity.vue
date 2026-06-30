<script setup lang="ts">
import { Panel, PanelContent } from "@dlbcodes/my-design-system";
import DeploymentRow from "./DeploymentRow.vue";
import type { Project } from "../../types/console";

defineProps<{ project: Project }>();
</script>

<template>
    <div class="flex flex-col gap-2">
        <Panel v-for="d in project.deployments" :key="d.id">
            <PanelContent class="p-4">
                <DeploymentRow
                    :status="d.status"
                    :message="d.message"
                    :branch="d.branch"
                    :commit="d.commit"
                    :author="d.author"
                    :created-at="d.createdAt"
                    :duration="d.duration"
                />
            </PanelContent>
        </Panel>
    </div>
</template>
