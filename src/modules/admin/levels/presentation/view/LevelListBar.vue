<script setup lang="ts">
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { RouterPaths } from "@/app/router/router-paths";
import { useRouter } from "vue-router";
import LevelsController from "../controller/levels.controller";
import LevelsPresenter from "../presenter/levels.presenter";

const controller = container.get<LevelsController>(TYPES.LevelsController);
const presenter = container.get<LevelsPresenter>(TYPES.LevelsPresenter);

const router = useRouter();

const createLevel = async (): Promise<void> => {
  const result = await controller.createLevel();

  if (!result.hasData()) {
    return;
  }

  router.push(
    `${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`
  );
};

const selectLevel = async (levelId: string): Promise<void> => {
    const result = await controller.selectLevel(levelId);
    if (result.hasData()) {
        return;
    }
    
    router.push(`${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`);
}

</script>

<template>
  <div class="mt-6">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center">
        <div class="w-5 h-5 mr-2">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-gray-500"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </div>
        <span class="text-gray-700">Categories</span>
      </div>
      <div :onclick="createLevel">
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
    <div class="ml-7 border-l-2 border-gray-200 pl-3">
      <div
        v-for="(level, index) in presenter.levelsViewModel.value"
        :onclick="() => selectLevel(level.id)"
        :key="index"
        class="flex items-center justify-between text-sm text-gray-600 py-1 cursor-pointer"
      >
        <div class="flex items-center" >
          <div class="w-4 h-4 mr-2">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-gray-500"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </div>
          <span>{{ level.name }}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-square-pen text-gray-400"
          aria-hidden="true"
        >
          <path
            d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          ></path>
          <path
            d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
