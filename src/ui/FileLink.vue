<script setup lang="ts">
export interface IFleLinkProps {
    text: string;
    path: string;
}

const { text, path } = defineProps<IFleLinkProps>();
</script>

<template>
    <img src="/src/assets/images/ic_doc.svg">

    <router-link class="text-[#01AEEA] hover:text-[#01AEEA] text-left" :to="path">
        <span class="font-roboto-400 text-[14px] sm:text-[16px] text-primary block text-left underline">
            {{ text }}</span>
    </router-link>
</template>