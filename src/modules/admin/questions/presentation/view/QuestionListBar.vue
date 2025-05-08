<script setup lang="ts">
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import QuestionsController from "../controller/questions.controller";
import QuestionsPresenter from "../presenter/questions.presenter";

const controller = container.get<QuestionsController>(
    TYPES.QuestionsController
);
const presenter = container.get<QuestionsPresenter>(TYPES.QuestionsPresenter);

const router = useRouter();

const selectQuestion = (id: string): void => {
    const result = controller.selectQuestion(id);
};

const createQuestion = async (): Promise<void> => {
    const result = controller.createQueustion();
};

</script>

<template>
    <div class="mt-6">
        <div class="flex items-center justify-between mb-2">
            <div class="flex items-center">
                <div class="w-5 h-5 mr-2 text-gray-500">?</div>
                <span class="text-gray-700">Questions</span>
            </div>
            <div :onclick="createQuestion">

            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-plus text-gray-500" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
            </svg>
            </div>
        </div>
        <div class="ml-7 border-l-2 border-gray-200 pl-3 cursor-pointer">
            <div v-for="(question, index) in presenter.questionsViewModel.value" :onclick="() => selectQuestion(question.id)"
                class="flex items-center justify-between text-sm text-gray-600 py-1">
                <div class="flex items-center">
                    <div class="w-4 h-4 mr-2 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"
                            fill="none" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                    </div>
                    <div
                        class="w-4 h-4 mr-2 rounded border border-gray-300 flex items-center justify-center bg-purple-500">
                        <svg v-if="question.id === presenter.questionViewModel.value?.id" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-check text-white" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                    </div>
                    <span>{{question.text}}</span>
                </div>
            </div>
           
        </div>
    </div>
</template>
