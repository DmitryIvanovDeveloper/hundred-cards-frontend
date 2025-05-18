<script setup lang="ts">
import { TYPES } from "../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { RouterPaths } from "@/app/router/router-paths";
import { useRouter } from "vue-router";
import LevelsController from "../controller/levels.controller";
import LevelsPresenter from "../presenter/levels.presenter";
import ProjectItemList from "@/ui/ProjectItemList.vue";

const controller = container.get<LevelsController>(TYPES.LevelsController);
const presenter = container.get<LevelsPresenter>(TYPES.LevelsPresenter);

const router = useRouter();

const createLevel = async (): Promise<void> => {
	const result = await controller.createLevel();

	if (!result.hasData()) {
		return;
	}

	goToConstructor();
};

const deleteLevel = async (id: string): Promise<void> => {
	const result = await controller.deleteLevel(id);

	if (!result.hasData()) {
		return;
	}

};


const selectLevel = async (levelId: string): Promise<void> => {
	const result = await controller.selectLevel(levelId);
	if (result.hasData()) {
		return;
	}

	goToConstructor();
};

const goToConstructor = (): void => {
	router.push(
		`${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.constructor}`
	);
};

</script>

<template>
	<ProjectItemList 
		:title="presenter.labels.title"
		:items="presenter.levelsViewModel.value"
		:onCreate="createLevel"
		:onEdit="() => {}"
		:onDelete="deleteLevel"
		:onSelect="selectLevel"
		:selected-id="presenter.levelViewModel.value?.id ?? ''"
		droppable
	/>
</template>