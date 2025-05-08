<script setup lang="ts">
import Folder from "@assets/folder.svg";
import Create from "@assets/emptyFolder.svg";
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { RouterPaths } from "@/app/router/router-paths";
import { useRouter } from "vue-router";
import LevelsController from "../controller/levels.controller";
import LevelsPresenter from "../presenter/levels.presenter";
import UniversalInput from "@/ui/UniversalInput.vue";

const controller = container.get<LevelsController>(TYPES.LevelsController);
const presenter = container.get<LevelsPresenter>(TYPES.LevelsPresenter);

const router = useRouter();

const createLevel = async (): Promise<void> => {
  const result = await controller.createLevel();
  if (result.hasData()) {
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

  router.push(
    `${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`
  );
};
</script>

<template>
  <div class="mb-8">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center">
        <button class="mr-2 p-1 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-bold"
            aria-hidden="true"
          >
            <path
              d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"
            ></path>
          </svg></button
        ><button class="mr-2 p-1 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-italic"
            aria-hidden="true"
          >
            <line x1="19" x2="10" y1="4" y2="4"></line>
            <line x1="14" x2="5" y1="20" y2="20"></line>
            <line x1="15" x2="9" y1="4" y2="20"></line>
          </svg></button
        ><button class="p-1 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-align-center"
            aria-hidden="true"
          >
            <path d="M17 12H7"></path>
            <path d="M19 18H5"></path>
            <path d="M21 6H3"></path>
          </svg>
        </button>
      </div>
      <span class="text-gray-600">Category title</span>
    </div>
    <input
      type="text"
      class="w-full p-3 border border-gray-300 rounded"
      :value="presenter.levelViewModel.value?.name"
    />
  </div>
</template>
