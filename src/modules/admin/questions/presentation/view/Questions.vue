<script setup lang="ts">
import ProjectSidebar from '@/modules/admin/projects/presentation/view/ProjectSidebar.vue';


</script>

<template>
    <div class="flex w-full bg-[#A5BBC5]">
        <ProjectSidebar />
        <router-view />
    </div>
</template>