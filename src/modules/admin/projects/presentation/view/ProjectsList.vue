<script setup lang="ts">
import Folder from '@/assets/folder.svg'
import Add from '@assets/emptyFolder.svg'
import Create from '@assets/emptyFolder.svg'
import ProjectsController from '../controller/projects.controller';
import { TYPES } from '../../types';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import { RouterPaths } from '@/app/router/router-paths';
import { useRouter } from 'vue-router';
import ProjectsPresenter from '../presenter/projects.presenter';

const controller = container.get<ProjectsController>(TYPES.ProjectsController);
const presenter = container.get<ProjectsPresenter>(TYPES.ProjectsPresenter);

const router = useRouter();

const createProject = async (): Promise<void> => {
    const result = await controller.createProject();
    if (!result.isSuccess) {
        return;
    }

    goToConstructor();
}

const selectProject = async (projectId: string): Promise<void> => {
    const result = await controller.selectProject(projectId);
    if (!result.isSuccess) {
        return;
    }

    goToConstructor();
}

const goToConstructor = () => {
    router.push(`${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`);
}

</script>

<template>
    
    <div class="flex items-start gap-[25px] p-[60px]">
        <button :onclick="createProject" class="flex flex-col">
                <Add />
            <span>{{"Создать Новый проект"}}</span>

        </button>
         
      
        <button 
            v-for="(project, index) in presenter.projectsViewModel.value" :key="index" 
            :onclick="() => selectProject(project.id)">
            <Folder />
            <span>{{project.name}}</span>
        </button>
    </div>
</template>