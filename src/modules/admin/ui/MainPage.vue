<script setup lang="ts">
import Header from './Header.vue';

export interface IMainPageProps {
    sidebar?: boolean;
}

const { sidebar } = defineProps<IMainPageProps>();

</script>

<template>

    <div 
        class="flex flex-col  min-h-screen "
        :class="[{
            'w-full': !sidebar,
            '2xl:w-[1440px]': sidebar,
        }]"
    >
        <Header :sidebar="sidebar"/>
         <div class="h-fet flex flex-grow flex-col bg-content_background items-center p-[16px] sm:p-[24px] gap-[16px]">
             <slot />
         </div>
     </div>
  
</template>
