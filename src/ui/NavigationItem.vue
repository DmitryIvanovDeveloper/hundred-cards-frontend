<script setup lang="ts">
import ArrowRight from 'vue-material-design-icons/ArrowRight.vue';
import { RequestGroupType } from '../modules/personal/requests-history/business/entities/request-group-type';
import CalculatorIco from "/src/assets/images/calculator-ico.svg";
import ExclamationIco from "/src/assets/images/exclamation-ico.svg";
import Houses from "/src/assets/images/houses-ico.svg";

export interface INavigationItemProps {
    id: string;
    title: string;
    info: string;
    type: RequestGroupType
}

const { title, info, type } = defineProps<INavigationItemProps>();

const getIcoPathByType = (): string => {
    if (type === RequestGroupType.RecalculationsAjustments || type === RequestGroupType.ConclusionEtc) {
        return CalculatorIco
    }

    if (type === RequestGroupType.Complaints) {
        return ExclamationIco
    }

    if (type === RequestGroupType.Services) {
        return Houses
    }

   return '';
}

</script>

<template>
    <div class="w-full gap-[10px] grid bg-white rounded-[4px] py-[16px] pr-[12px] pl-[16px] h-[99px] sm:h-[92px] items-center cursor-pointer" 
    >
        <div class="grid grid-cols-[26px_1fr] sm:grid-cols-[50px_1fr] w-full gap-[16px] grid-flow-col justify-start items-center">

            <img :src="getIcoPathByType()" />
                
                
            <div class="flex flex-col justify-start justify-between w-full gap-[4px]">
                <span
                    class="grid grid-flow-col text-left text-label font-roboto-700 text-[14px] justify-bwtween items-center">
                    {{ title }}
                    <i class="grid justify-end">
                        <ArrowRight class="text-right text-color_primary"  />
                    </i>
                </span>

                <span class="hidden block text-left text-label font-roboto-400 text-[14px] sm:block">
                    {{info}}
                </span
>
            </div>
        </div>
        <span class="block text-left text-label font-roboto-400 text-[14px] sm:hidden">
            {{info}}
        </span>
    </div>
</template>
