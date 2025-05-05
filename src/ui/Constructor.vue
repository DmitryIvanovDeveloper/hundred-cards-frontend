<script setup lang="ts">
import HTMLContent from './HTMLContent.vue';
import RequiredFieldsInfo from './RequiredFieldsInfo.vue';
import {
    ElementType,
    ICheckBoxViewModel,
    IConstructorElementViewModel,
    IFileViewModel,
    ISelectViewModel,
} from './types/constructor';
import UniversalCheckbox from './UniversalCheckbox.vue';
import UniversalDatePicker from './UniversalDatePicker.vue';
import UniversalInput from './UniversalInput.vue';
import UniversalSelect, { IOption } from './UniversalSelect.vue';
import UniversalTextArea from './UniversalTextArea.vue';
import UploadFile from './UploadFile.vue';

export interface IConstructorProps {
    elements: Array<IConstructorElementViewModel>;
    handleChange: (id: string, value: any | boolean) => void;
    handleUplaodFile?: (fieldId: string, value: File | Array<File>) => void;
    handleLoadFile?: (id: string) => void;
    
    readOnly: boolean;
}

const { elements, handleChange, handleLoadFile,readOnly = false } = defineProps<IConstructorProps>();

</script>

<template>
    <div class="grid gap-[20px]">
        <RequiredFieldsInfo v-if="!readOnly"/>

        <div v-for="element in elements">
            <div class="grid gap-[15px]" v-if="readOnly">
                <div
                    class="grid gap-[5px]"
                    v-if="element.type === ElementType.Select ||
                    element.type === ElementType.Input ||
                    element.type === ElementType.Textarea
                "
                >
                    <span class="font-roboto-500 text-[16px] text-left">{{element.options?.label}}</span>
                    <span
                        class="font-roboto-400 text-[16px] text-left sm: text-[18px]"
                      
                    >
                        {{  element.value }}
                    </span>
                </div>
               
                
                <div 
                    class="grid gap-[5px] "
                    v-if="element.type === ElementType.File"
                >
                  
                    <div
                        class="flex flex-row gap-[15px] items-center"
                        v-for="(item, index) in (element.value as Array<IFileViewModel>)" :key="index"
                    >
                        
                        <div class="grid grid-flow-col justify-start items-center gap-[5px]">
                            <img src="@assets/images/ic_doc.svg"/>
                            <span class="font-roboto-400 text-[16px] text-text_link cursor-pointer" :onclick="() => handleLoadFile?.(item.id)">{{item.name}}</span>
                        </div>
                    <Button
                        unstyled
                        class="sm:w-[175px] h-[52px] border-color_primary rounded-[26px] font-roboto-400 text-[16px] text-text_link px-4 py-2 grid grid-flow-col items-center justify-center gap-[10px] cursor-pointer"
                        >
                            Распечатать
                            <img src="/src/assets/images/print.svg" />
                    </Button>
                    </div>
                </div>
             
            </div>
           
            <div class="grid"  v-if="!readOnly">

                <HTMLContent
                    :content="element.options.data"
                    v-if="
                        (element.type === ElementType.Richtext || element.type === ElementType.Paragraph) &&
                        typeof element.options?.data === 'string'
                    "
                    class="text-[16px] font-roboto-400 sm:text-[18px] text-left text-standard"
                />

                
                <UniversalInput
                    v-if="
                        element.type === ElementType.Input"
                    :onChange="(value) => handleChange(element.id, value)"
                    :type="(element.options?.subtype as 'number' | 'text' | 'email' | 'phone' | 'password')"
                    :placeholder="element.options?.placeholder"
                    :label="element.options?.label"
                    :required="element.options?.required"
                    bg="secondary"
                />

                <UniversalSelect
                    v-if="element.type === ElementType.Select"
                    :value="element.value"
                    :options="(element.options?.data as Array<ISelectViewModel>)"
                    optionLabel="title"
                    :isRequired="element.required"
                    :label="element.options?.label"
                    :placeholder="element.options?.placeholder"
                    :onChange="(value) => handleChange(element.id, value.value)"
                    :type="(element.options?.subtype as 'multiple' | 'single')"
                    class="w-full"
                />

                <UniversalTextArea
                    v-if="element.type === ElementType.Textarea"
                    :label="element.options?.label"
                    :onChange="(value) => handleChange(element.id, value)"
                    :is-required="element.options?.required"
                    :placeholder="element.options?.placeholder"
                    :limit="element.options?.limit ?? 500"
                />

                <UniversalDatePicker
                    v-if="element.type === ElementType.Date"
                    :type="(element.options?.subtype as 'date' | 'daterange' | 'datetime')"
                    :label="element.options?.label"
                    :is-required="element.options?.required"
                    :placeholder="element.options?.placeholder"
                    :onChange="(value) => handleChange(element.id, value)"
                />

                <UploadFile
                    v-if="element.type === ElementType.Upload"
                    :title="element.options?.label"
                    :accept="element.options?.accept"
                    :limit="element.options?.limit"
                    :onUploaded="(value) => handleUplaodFile?.(element.id, value)"
                />

                <UniversalCheckbox
                    v-if="
                        element.type === ElementType.Checkbox &&
                        element.options?.data &&
                        (element.options?.subtype === 'multiple' || element.options?.subtype === 'single')
                    "
                    :type="element.options?.subtype"
                    :onChange="(value) => handleChange(element.id, value)"
                    :options="
                        (element.options.data as Array<ICheckBoxViewModel>) || (element.options.data as ICheckBoxViewModel)
                    "
                />
            </div>

        </div>
    </div>
</template>
