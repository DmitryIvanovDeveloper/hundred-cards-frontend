<script setup lang="ts">
const items: string[] = ['@assets/images/baingnner.svg'];
import Carousel from 'primevue/carousel';
import { ref } from 'vue';

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
    },
]);
</script>


<template>
    <div class="h-screen flex sticky top-16">
        <Carousel
            :value="items" 
            :showIndicators="false"
            :responsiveOptions="responsiveOptions">
            <template #item="slotProps">
                <img src="@assets/images/banner.svg" :class="`w-auto rounded`" />
            </template>
        </Carousel>
    </div>
</template>

<style scoped>
img {
    width: auto;
    max-width: 100%;
    max-height: 80%;
    object-fit: cover;
}
</style>
