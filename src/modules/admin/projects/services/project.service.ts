import { inject } from "inversify";
import Result from "@/infrastructure/helpers/result";
import { TYPES } from "../types";
import IProjectsService from "../business/plugins/projects.service.plugin";
import IProjectsLocalRepository from "../business/plugins/projects.local.repository.plugin";
import ProjectNotSelectedError from "../business/errors/project-not-selected.error";

export default class ProjectsService  implements IProjectsService {

    constructor(
        @inject(TYPES.ProjectsLocalRepository)
        private readonly _repository: IProjectsLocalRepository
    ){}

    public getSelectedProjectId = (): Result<string> => {
        const project = this._repository.getProject();
        if (!project.value) {
            return Result.failure(new ProjectNotSelectedError());
        }

        return Result.success(project.value.id);
    }
}