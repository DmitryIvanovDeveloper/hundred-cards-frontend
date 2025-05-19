<script setup lang="ts">
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import QuestionsController from "../controller/questions.controller";
import QuestionsPresenter from "../presenter/questions.presenter";
import { useRouter } from "vue-router";
import { RouterPaths } from "@/app/router/router-paths";
import ProjectItemList from "@/ui/ProjectItemList.vue";

const controller = container.get<QuestionsController>(
    TYPES.QuestionsController
);
const presenter = container.get<QuestionsPresenter>(TYPES.QuestionsPresenter);

const router = useRouter();

const selectQuestion = async (id: string): Promise<void> => {

    const result = await controller.selectQuestion(id);
    if (!result.isSuccess) {
        return;
    }

    goToConstructor();
};

const createQuestion = async (): Promise<void> => {
    await controller.createQuestion();
};


const goToConstructor = (): void => {
  router.push(`${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`);
}

</script>

<template>
    <ProjectItemList 
        :title="presenter.labels.title"
        :items="presenter.questionsViewModel.value"
        :onCreate="createQuestion"
        :creating="controller.creating.value"
        :onEdit="() => {}"
        :onDelete="controller.deleteQuestion"
        :onSelect="selectQuestion"
        :selected-id="presenter.questionViewModel.value?.id ?? ''"
        droppable
        checkable
    />
</template>

<style scoped>
/* Optional: Add a smooth transition to the items */
div[draggable="true"] {
    transition: all 0.2s ease;
}

div[draggable="true"]:active {
    opacity: 0.7;
    /* Make the item semi-transparent when dragging */
}

div[draggable="true"]:hover {
    cursor: move;
    /* Change cursor when hovering over draggable items */
}

/* Highlight the item when dragged over */
div[draggable="true"].bg-purple-50 {
    background-color: #f3e8ff;
    /* Lighter background color when dragged over */
}
</style>
