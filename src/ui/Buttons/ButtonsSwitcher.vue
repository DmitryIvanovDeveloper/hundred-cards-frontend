<script setup lang="ts">
import { ref, defineProps } from 'vue';

interface Option {
    label: string;
    description?: string;
    value: string;
}

export interface IToogleSelectorProps {
    options: Array<Option>;
    value?: string;
    handlePress: (type: string) => void;
}

const { handlePress, options, value } = defineProps<IToogleSelectorProps>();

const selected = ref<string>(value ?? options[0].value);

function selectOption(value: string) {
    selected.value = value;
    handlePress(value);
}
</script>

<template>
    <div class="flex w-full rounded-md border border-[#FF811B] overflow-hidden ">
        <div
            v-for="option in options"
            :key="option.value"
            class="font-roboto-500 text-[16px]"
            :class="[
                'flex-1 py-3 px-4 text-center cursor-pointer transition-all duration-200',
                selected === option.value ? 'bg-[#FF811B] bs text-white font-semibold' : 'bg-[#FFFFFF] text-[#FF811B]',
            ]"

            @click="selectOption(option.value)"
        >
            <div class="font-roboto-800 text-[15px]" :class="selected === option.value ? 'text-[#FFFFFF]' : 'text-[#FF811B]'">
                {{ option.label }}
            </div>
            <div :class="selected === option.value ? 'text-white' : 'text-primary'" class="font-roboto-400 text-[14px] hidden text-sm xl:block">
                {{ option.description }}
            </div>
        </div>
    </div>
</template>
