import { inject } from "inversify";
import { TYPES } from "../../types";
import IProjectsRepository from "../plugins/projects.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import IProjectsService from "../plugins/projects.service.plugin";

export default class ProjectsService  implements IProjectsService {

    constructor(
        @inject(TYPES.ProjectsRepository)
        private readonly _repository: IProjectsRepository
    ){}

    public getSelectedProjectId = (): Result<string> => {
        const result = this._repository.getProject();
        if (!result.hasData()) {
            return Result.failure();
        }

        const project = result.data;
        return Result.success(project?.id);
    }
}