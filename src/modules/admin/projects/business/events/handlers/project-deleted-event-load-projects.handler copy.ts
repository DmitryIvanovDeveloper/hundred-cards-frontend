import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import LoadProjectsUseCase from "../../usecases/load-projects.usecase";
import ProjectDeletedEvent from "../project-deleted-event";

export default class ProjectDeleteEventLoadProjectsHandler implements IAsyncEventHandler<ProjectDeletedEvent> {
  constructor(
		@inject(TYPES.UpdateProjectUseCase)
		private readonly _loadProjectsUseCase: LoadProjectsUseCase,
	) {}

	canHandle(event: ProjectDeletedEvent): boolean {
		return event instanceof ProjectDeletedEvent;
	}

	async handleAsync(event: ProjectDeletedEvent): Promise<void> {
		await this._loadProjectsUseCase.execute();
	}
}
