<script setup lang="ts">
import { FolderIcon, PlusIcon } from '@heroicons/vue/24/solid';
import { Button } from 'primevue';


export interface IProjectSidbarItemLayout {
    title: string,
    onAdd: () => void;
}

const { title, onAdd } = defineProps<IProjectSidbarItemLayout>();
</script>
<template>
<div class="flex items-center justify-between mb-2">
    <div class="flex items-center gap-[15px]">
        <FolderIcon class="w-[15px] h-[15px] text-[#FFF]"/>
        <span class="fonet-rubik-600 text-[13px]">{{ title }}</span>
    </div>  
    <button @click="onAdd">
        <PlusIcon class="w-[15px] h-[15px]" />
    </button>
</div>
<slot />
</template>