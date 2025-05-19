import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import LoadProjectsUseCase from "../../usecases/load-projects.usecase";
import ProjectDeletedEvent from "../project-deleted-event";

export default class ProjectDeletedEventLoadProjectsHandler implements IAsyncEventHandler<ProjectDeletedEvent> {
  constructor(
		@inject(TYPES.LoadProjectsUseCase)
		private readonly _loadProjectsUseCase: LoadProjectsUseCase,
	) {}

	public canHandle(event: ProjectDeletedEvent): boolean {
		return event instanceof ProjectDeletedEvent;
	}

	public async handleAsync(event: ProjectDeletedEvent): Promise<void> {
		console.log("ProjectDeletedEventLoadProjectsHandler")
		await this._loadProjectsUseCase.execute();
	}
}
