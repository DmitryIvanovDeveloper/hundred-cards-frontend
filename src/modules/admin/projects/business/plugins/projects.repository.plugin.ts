import Result from "@/infrastructure/helpers/result";
import ProjectDTO, { CreateProjectRequest } from "../dtos/project.dto";
import Project from "../entities/project";

export default interface IProjectsRepository {
    getProject(): Result<Project>;
    storeProjects(projects: Project[]): void;
    storeProject(project: Project): void;
    findProjectById(id: string): Result<Project>;
    createProject:(dto: CreateProjectRequest) => Promise<Result<ProjectDTO>>;
    loadProjects(): Promise<Result<Array<ProjectDTO>>>;
}