<script setup lang="ts">
import ProjectsSidebar from './ProjectSidebar.vue';

</script>

<template>
    <div class="flex w-full bg-[#A5BBC5]">
        <ProjectsSidebar />
        <router-view />
    </div>
</template>