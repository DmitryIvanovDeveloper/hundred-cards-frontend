import Result from "@/infrastructure/helpers/result";
import ProjectDTO, { CreateProjectRequestDTO } from "../dtos/create-project.dto";
import Project from "../entities/project";
import { UpdateProjectRequestDTO } from "../dtos/update-project.dto";

export default interface IProjectsHttpRepository {
    updateProject(projectId: string, newProject: UpdateProjectRequestDTO): Promise<Result<ProjectDTO>>;
    createProject:(dto: CreateProjectRequestDTO) => Promise<Result<ProjectDTO>>;
    loadProjects(): Promise<Result<Array<ProjectDTO>>>;
}