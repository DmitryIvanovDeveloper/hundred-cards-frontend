<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import HTMLContent from './HTMLContent.vue';
import { defineProps, onMounted, ref, watch } from 'vue';

export interface ICheckboxOption {
    id: string;
    required: boolean;
    label: string;
    checked: boolean;
}

export interface IUniversalCheckboxProps {
    options: ICheckboxOption[] | ICheckboxOption;
    modelValue?: boolean | string[];
    type: 'single' | 'multiple';
    onChange: (value: boolean | string[]) => void;
}

const props = withDefaults(defineProps<IUniversalCheckboxProps>(), {
    options: () => [],
});

const model = ref<any>(
    props.type === 'multiple'
        ? Array.isArray(props.options)
            ? props.options.filter((opt) => opt.required || opt.checked).map((opt) => opt.id)
            : []
        : (props.modelValue ?? (props.options as ICheckboxOption).checked),
);

onMounted(() => {
    props.onChange(model.value);
});

watch(
    () => props.modelValue,
    (val) => {
        model.value = val ?? (props.type === 'multiple' ? [] : false);
    },
);

watch(model, (val) => {
    props.onChange(val);
});
</script>

<template>
    <div class="flex flex-col gap-2 ">
        <div v-if="props.type === 'single'">
            <div class="flex items-center gap-[15px] items-center">
                <label :for="(props.options as ICheckboxOption).id" class="flex items-center gap-[15px] cursor-pointer justify-center items-center">
                    <Checkbox
                        :checked="(props.options as ICheckboxOption).checked"
                        class=" !flex !justify-center rounded-[4px]"
                        v-model="model"
                        :binary="true"
                        :inputId="(props.options as ICheckboxOption).id"
                    />
                    <HTMLContent
                        :content="(props.options as ICheckboxOption)?.label"
                        class="font-roboto-400 text-standard text-left"
                    />
                </label>
            </div>
        </div>

        <div v-if="props.type === 'multiple'" class="grid gap-[10px]">
            <div
                v-for="(opt, index) in props.options as ICheckboxOption[]"
                :key="opt.id"
                class="flex items-center gap-2"
            >
                <label :for="opt.id" class="flex items-center gap-2 cursor-pointer" :key="opt.id">
                    <Checkbox
                        class="!flex !items-center !justify-center rounded-[4px] hover-none"
                        v-model="model"
                        :inputId="opt.id"
                        :value="opt.id"
                    />
                    <HTMLContent :content="opt.label" class="font-roboto-400 text-standard" />
                </label>
            </div>
        </div>
    </div>
</template>

<style>
.p-checkbox-input input {
    color: blue !important;
}
</style>
