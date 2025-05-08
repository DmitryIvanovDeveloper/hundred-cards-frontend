<script setup lang="ts">
import Folder from "@assets/folder.svg";
import Create from "@assets/emptyFolder.svg";
import ProjectsController from "../controller/projects.controller";
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { RouterPaths } from "@/app/router/router-paths";
import { useRouter } from "vue-router";
import ProjectsPresenter from "../presenter/projects.presenter";

const controller = container.get<ProjectsController>(TYPES.ProjectsController);
const presenter = container.get<ProjectsPresenter>(TYPES.ProjectsPresenter);

const router = useRouter();

const createProject = async (): Promise<void> => {
    const result = await controller.createProject();
    if (!result.isSuccess) {
        return;
    }

    router.push(
        `${RouterPaths.admin}/${RouterPaths.levels}/${RouterPaths.constructor}`
    );
};

const selectProject = async (id: string): Promise<void> => {
    const result = await controller.selectProject(id);
    if (!result.isSuccess) {
        return;
    }

    router.push(
        `${RouterPaths.admin}/${RouterPaths.levels}/${RouterPaths.constructor}`
    );
};

</script>

<template>
    <div class="mt-6">
        <div class="flex items-center justify-between mb-2">
            <div class="flex items-center">
              
                <div class="w-5 h-5 mr-2">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                </div>
              <span class="text-gray-700">Projects</span>
            </div>
            <div :onclick="createProject">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-plus text-gray-500"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </div>
           
        </div>
        <div 
            :onclick="() => selectProject(project.id)"
            v-for="(project, index) in presenter.projectsViewModel.value"
            class="ml-7 border-l-2 border-gray-200 pl-3 py-1 cursor-pointer">
            <div class="flex items-center justify-between text-sm text-gray-600 py-1">
                <span>{{ project.name }}</span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-square-pen text-gray-400" aria-hidden="true">
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path
                        d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z">
                    </path>
                </svg>
            </div>
        </div>
    </div>
</template>
