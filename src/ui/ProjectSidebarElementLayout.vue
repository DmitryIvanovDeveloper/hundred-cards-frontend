<script setup lang="ts">
import Humburger from "@assets/hamburger.svg";

export interface IProjectSidbarElementLayout {
	title?: string;
	onEdit: () => void;
	droppable: boolean;
	selected: boolean;
	checkable: boolean;
	checked?: boolean;
	edited?: boolean;
}

const { title, onEdit, droppable, checkable, checked, edited } =
	defineProps<IProjectSidbarElementLayout>();
</script>
<template>
	<div
		class="flex items-center text-sm text-gray-600 shadow-none transition-all !duration-200 underline-offset-4 gap-[10px]"
	>
		<Humburger v-if="droppable" />
		<el-checkbox v-if="checkable" :checked="checked"/>
		<div 
			class="flex justify-between w-full p-1 cursor-pointer hover:bg-gray-200"
			:class="[selected ? 'bg-[#F7F7F7] text-blue-600' : '']"
		>
		<span class="font-roboto-400 text-[13px] text-[#424242] text-left block truncate">
			{{ title }}
		  </span>	

			<div class="flex gap-[10px]">
				<span v-if="edited">⚠️</span>

				<button @click="onEdit">
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						class="lucide lucide-square-pen text-gray-400" aria-hidden="true">
						<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
						<path
							d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z">
						</path>
					</svg>
				</button>
			</div>
		
		</div>
	</div>
</template>
