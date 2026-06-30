<script setup lang="ts">
import DeploymentTimeline from "./DeploymentTimeline.vue";
import type { Project } from "../../types/console";

defineProps<{ project: Project }>();
</script>

<template>
    <DeploymentTimeline :items="project.deployments" />
</template>
