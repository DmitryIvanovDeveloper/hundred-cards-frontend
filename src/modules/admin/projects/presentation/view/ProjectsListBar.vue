<script setup lang="ts">
import ProjectsController from "../controller/projects.controller";
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { RouterPaths } from "@/app/router/router-paths";
import { useRouter } from "vue-router";
import ProjectsPresenter from "../presenter/projects.presenter";
import ProjectItemList from "@/ui/ProjectItemList.vue";

const controller = container.get<ProjectsController>(TYPES.ProjectsController);
const presenter = container.get<ProjectsPresenter>(TYPES.ProjectsPresenter);

const router = useRouter();

const createProject = async (): Promise<void> => {
    const result = await controller.createProject();
    if (!result.isSuccess) {
        return;
    }

    router.push(
        `${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`
    );
};

const selectProject = async (id: string): Promise<void> => {
    const result = await controller.selectProject(id);
    if (!result.isSuccess) {
        return;
    }

    router.push(
        `${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`
    );
};

const deleteProject = async (id: string): Promise<void> => {
    const result = await controller.deleteProject(id);
    if (!result.isSuccess) {
        return;
    }
};

</script>

<template>
    <ProjectItemList 
        :title="presenter.label.title"
        :items="presenter.projectsViewModel.value"
        :onCreate="createProject"
        :onDelete="deleteProject"
        :onEdit="() => {}"
        :onSelect="selectProject"
        :selected-id="presenter.projectViewModel.value?.id ?? ''"
    />
</template>
