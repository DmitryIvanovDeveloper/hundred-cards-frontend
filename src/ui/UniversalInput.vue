<script setup lang="ts">
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Password from 'primevue/password';
import FieldWrapper from './FieldWrapper.vue';
import { computed, watch } from 'vue';

export interface IUniversalInput {
    error?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    required?: boolean;
    disabled?: boolean;
    type?: 'number' | 'password' | 'phone' | 'text' | 'email';
    bg?: 'primary' | 'secondary';
    errorlink?: {
        title: string;
        path: string;
    };
    onChange: (value: string) => void;
}

const { 
    value, 
    defaultValue, 
    error, 
    label, 
    onChange, 
    required: isRequired, 
    disabled, 
    type = 'text', 
    bg, 
    errorlink,
    placeholder
 } = defineProps<IUniversalInput>();

const modelValue = computed({
    get: () => value ?? defaultValue ?? '',
    set: (newValue: string) => onChange(newValue),
});

// 👉 Вычисляем стиль фона
const inputStyle = computed(() => ({
    backgroundColor: 'white'
}));

</script>


<template>
    <FieldWrapper :label="label" :isRequired="isRequired" :error="error" :errorlink="errorlink">
        <InputMask
            v-if="type === 'phone'"
            v-model="modelValue"
            mask="+7 (999) 999-99-99"
            class="!px-[20px] !py-[14px] !placeholder-text_primary"
            :style="inputStyle"
            :placeholder="placeholder ?? '+7 (__) ___-__-__'"
        />
        <Password
            toggleMask
            v-if="type === 'password'"
            input-class="w-full !py-[14px] !px-[20px] !placeholder-text_primary h-[52px]"
            :type="type"
            :disabled="disabled"
            :feedback="false"
            :placeholder="placeholder"
            :modelValue="modelValue"
            @update:modelValue="(value) => onChange(value as string)"
            :inputStyle="inputStyle"
        />
        <InputText
            v-if="type === 'text' || type === 'number'"
            :type="type"
            class="!px-[20px] !py-[14px] !placeholder-text_primary"
            :disabled="disabled"
            :placeholder="placeholder"
            v-model="modelValue"
            :style="inputStyle"
        />
        <InputText
            v-if="type === 'email'"
            :type="type"
            class="!px-[20px] !py-[14px] !placeholder-text_primary"
            :disabled="disabled"
            :placeholder="placeholder ?? 'email@example.com'"
            v-model="modelValue"
            :style="inputStyle"
        />
    </FieldWrapper>
</template>


<style scoped>

</style>
