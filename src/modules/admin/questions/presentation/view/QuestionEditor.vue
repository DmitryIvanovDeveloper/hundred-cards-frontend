<script setup lang="ts">
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import QuestionsController from "../controller/questions.controller";
import QuestionsPresenter from "../presenter/questions.presenter";
import { onMounted } from "vue";

const controller = container.get<QuestionsController>(
    TYPES.QuestionsController
);
const presenter = container.get<QuestionsPresenter>(TYPES.QuestionsPresenter);

const router = useRouter();

onMounted(() => {
    if (!presenter.questionsViewModel.value.length) {
        return;
    }
    selectQuestion(presenter.questionsViewModel.value[0].id);
});

const selectQuestion = (id: string): void => {
    const result = controller.selectQuestion(id);
};


</script>

<template>
    <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
            <div class="flex items-center">
                <button class="mr-2 p-1 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-bold" aria-hidden="true">
                        <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"></path>
                    </svg></button><button class="mr-2 p-1 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-italic" aria-hidden="true">
                        <line x1="19" x2="10" y1="4" y2="4"></line>
                        <line x1="14" x2="5" y1="20" y2="20"></line>
                        <line x1="15" x2="9" y1="4" y2="20"></line>
                    </svg></button><button class="p-1 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-align-center" aria-hidden="true">
                        <path d="M17 12H7"></path>
                        <path d="M19 18H5"></path>
                        <path d="M21 6H3"></path>
                    </svg>
                </button>
            </div>
            <span class="text-gray-600">Question</span>
        </div>
        <textarea class="w-full p-3 border border-gray-300 rounded h-28" placeholder="Раз два три"
            :value="presenter.questionViewModel.value?.text"></textarea>
    </div>

    <!-- Answers -->
    <div>
        <div class="flex items-center justify-between mb-2">
            <div class="flex items-center">
                <span class="text-gray-600 mr-2">Corr.</span><button class="mr-2 p-1 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-bold" aria-hidden="true">
                        <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"></path>
                    </svg></button><button class="mr-2 p-1 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-italic" aria-hidden="true">
                        <line x1="19" x2="10" y1="4" y2="4"></line>
                        <line x1="14" x2="5" y1="20" y2="20"></line>
                        <line x1="15" x2="9" y1="4" y2="20"></line>
                    </svg></button><button class="p-1 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-align-center" aria-hidden="true">
                        <path d="M17 12H7"></path>
                        <path d="M19 18H5"></path>
                        <path d="M21 6H3"></path>
                    </svg>
                </button>
            </div>
            <span class="text-gray-600">Answers</span>
        </div>


        <div 
            v-for="(answer, index) in presenter.questionViewModel.value?.answers" :key="index"
            class="flex items-center mb-2">
            <div class="flex items-center mr-2">
                <div class="w-4 h-4 mr-2">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                </div>
                <div class="w-5 h-5 rounded border border-gray-300 flex items-center justify-center bg-white">
                    <svg v-if="answer.isCorrect" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-check text-gray-600" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                </div>
            </div>
            <input type="text" class="flex-1 p-2 border border-gray-300 rounded" :value="answer.text" /><button
                class="ml-2 p-1 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-x" aria-hidden="true">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
            </button>
        </div>
       
        <div class="flex justify-end mt-4">
            <button class="bg-purple-500 text-white px-4 py-2 rounded">Add</button>
        </div>
    </div>

   
</template>
