<script setup lang="ts">
import { ref, onMounted } from "vue";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { TYPES } from "../../types";
import QuestionsController from "../controller/questions.controller";
import QuestionsPresenter from "../presenter/questions.presenter";
import Humburger from "@assets/hamburger.svg";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import ConstructorItemLayout from "@/ui/ConstructorItemLayout.vue";
import UniversalInput from "@/ui/UniversalInput.vue";

const controller = container.get<QuestionsController>(
	TYPES.QuestionsController
);
const presenter = container.get<QuestionsPresenter>(TYPES.QuestionsPresenter);

onMounted(() => {
	if (presenter.questionsViewModel.value.length > 0) {
		selectQuestion(presenter.questionsViewModel.value[0].id);
	}
});

const selectQuestion = (id: string): void => {
	controller.selectQuestion(id);
};

const draggedItem = ref<number | null>(null);
const draggedOverIndex = ref<number>(-1);

const onDragStart = (index: number): void => {
	draggedItem.value = index;
	draggedOverIndex.value = -1;
};

const onDragOver = (e: DragEvent, index: number): void => {
	e.preventDefault();
	draggedOverIndex.value = index;
};

const onDrop = (index: number): void => {
	if (draggedItem.value === null || draggedOverIndex.value === null) return;

	const draggedItemData = presenter.questionsViewModel.value[draggedItem.value];
	const updatedItems = [...presenter.questionsViewModel.value];

	updatedItems.splice(draggedItem.value, 1);
	updatedItems.splice(index, 0, draggedItemData);

	presenter.questionsViewModel.value.splice(
		0,
		presenter.questionsViewModel.value.length,
		...updatedItems
	);

	draggedItem.value = null;
	draggedOverIndex.value = -1;
};
</script>

<template>
	<div v-if="presenter.questionViewModel.value" class="flex flex-col gap-[50px]">
		<ConstructorItemLayout :label="presenter.labels.question">
			<Textarea @value-change="(value) => controller.updateText(value)"
				class="w-full p-3 border border-gray-300 rounded min-h-30 bg-[#FFFFFF] !text-[#B7C0CA] !font-rubik-600 !text-[16px]"
				placeholder="Question text" v-model="presenter.questionViewModel.value.name" 
			/>
		</ConstructorItemLayout>

		<ConstructorItemLayout :label="presenter.labels.points" >
			<UniversalInput
				type="number"
				:value="presenter.questionViewModel.value.points"
				:onChange="(value) => controller.updatePoints(Number(value))"
			/>
		</ConstructorItemLayout>

		<div>
			<ConstructorItemLayout :label="presenter.labels.answers">
				<div v-for="(answer, index) in presenter.questionViewModel.value.answers" :key="answer.id"
					draggable="true" @dragstart="onDragStart(index)" @dragover="(e) => onDragOver(e, index)"
					@drop="onDrop(index)" :class="[
						'flex items-center justify-between text-sm text-gray-600  rounded-lg transition-all duration-200 hover:bg-purple-100',
						draggedOverIndex === index ? 'bg-purple-50' : '',
					]" class="flex items-center gap-[8px]">
					<Humburger />

					<el-checkbox v-model="answer.isCorrect" @change="
						(value) =>
							controller.updateAnswerSelection(answer.id, value as boolean)
					" />

					<InputText @update:model-value="
						(value) => controller.updateAnswerText(answer.id, value as string)
					" v-model="answer.name" class="flex-1 p-2 border border-gray-300 rounded bg-[#FFFFFF]" />

					<button class="ml-2 p-1 text-gray-400 cursor-pointer"
						@click="() => controller.removeAnswer(answer.id)">
						✕
					</button>
				</div>

				<div class="flex justify-end mt-4">
					<button class="bg-purple-500 text-[#FFFFFF] px-4 py-2 rounded" @click="controller.addNewAnswer">
						{{ presenter.labels.addAnswer }}
					</button>
				</div>
			</ConstructorItemLayout>

		</div>
	</div>
</template>
