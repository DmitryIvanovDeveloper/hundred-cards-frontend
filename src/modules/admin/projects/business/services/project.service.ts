import { inject } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IProjectsService from "../plugins/projects.service.plugin";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";
import ProjectNotSelectedError from "../errors/project-not-selected.error";

export default class ProjectsService  implements IProjectsService {

    constructor(
        @inject(TYPES.ProjectsLocalRepository)
        private readonly _repository: IProjectsLocalRepository
    ){}

    public getSelectedProjectId = (): Result<string> => {
        const project = this._repository.getProject().value;
        if (!project) {
            return Result.failure(new ProjectNotSelectedError())
        }

        return Result.success(project.id);
    }
}