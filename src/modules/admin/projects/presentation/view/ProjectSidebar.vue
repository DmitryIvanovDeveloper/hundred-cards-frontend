<script setup lang="ts">
import ProjectsController from "../controller/projects.controller";
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import ProjectsPresenter from "../presenter/projects.presenter";

import ProjectsListBar from "./ProjectsListBar.vue";
import LevelListBar from "@/modules/admin/levels/presentation/view/LevelListBar.vue";
import QuestionListBar from "@/modules/admin/questions/presentation/view/QuestionListBar.vue";

const controller = container.get<ProjectsController>(TYPES.ProjectsController);
const presenter = container.get<ProjectsPresenter>(TYPES.ProjectsPresenter);


</script>

<template>
    <div class="w-70 bg-blue-50 flex flex-col border-r border-gray-200">
        <div class="p-4 flex items-center">
            <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white mr-3"><svg
                    xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-user" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg></div><span class="text-xl font-light text-gray-700">Lalala</span>
        </div>
        <div class="px-3">
            <ProjectsListBar />
            <LevelListBar />
            <QuestionListBar />
        </div>
        <div class="mt-auto p-4 border-t border-gray-200">
            <div class="flex items-center text-gray-500 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                    height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help mr-1"
                    aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path d="M12 17h.01"></path>
                </svg><span>Help</span></div>
        </div>
    </div>

</template>
