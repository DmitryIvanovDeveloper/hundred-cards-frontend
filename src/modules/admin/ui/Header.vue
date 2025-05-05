<script setup lang="ts">
import NewsPlate from '@/modules/personal/news-notifications/presentation/view/NewsPlate.vue';
import SideBarPlate from '@/modules/personal/sidebar/presentation/view/Components/SideBarPlate.vue';
import ProfilePlate from '@/modules/personal/profile/presentation/view/ProfilePlate.vue';

export interface IMainPageProps {
    sidebar?: boolean;
}

const { sidebar = true } = defineProps<IMainPageProps>();

</script>

<template>
    <div class="grid grid-flow-col bg-secondary sm:bg-content_background w-full  justify-between items-center p-[16px]">
        <img src="@assets/images/hartia-logo.svg" class="w-[140px] h-[40px]" />
        <div class="grid grid-flow-col items-center gap-[15px] w-full">
            <NewsPlate />
            <ProfilePlate />
            <div class="lg:hidden w-[40px] h-[40px]">
                <SideBarPlate />
            </div>
        </div>
    </div>
</template>