import IHttpClient from "@/infrastructure/api/http/http.interface";
import { TYPES } from "@/infrastructure/bootstrap/types";
import { inject } from "inversify";
import IProjectsRepository from "../../business/plugins/projects.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import PostProjectRequest from "./dtos/post-project.request";
import { L } from "vitest/dist/chunks/reporters.d.CfRkRKN2";
import PostProjectResponse from "./dtos/post-project.response";
import { NetworkError } from "@/infrastructure/errors/network.error";
import ProjectDTO, { CreateProjectRequest } from "../../business/dtos/project.dto";
import Project from "../../business/entities/project";
import GetProjectResponse from "./dtos/get-project.response";
import { mapProjectResponseToDto } from "./dtos/mapper";
import ProjectNotSelectedError from "../../business/errors/project-not-selected.error";
import CreateProjectResponse from "../../business/dtos/project.dto";
import ProjectNotFoundError from "../../business/errors/project-not-found.error";

export default class ProjectsRepository implements IProjectsRepository  {

    constructor(
        @inject(TYPES.HttpClient)
        private readonly _httpClient: IHttpClient 
    ){}
   
    private project: Project | null;
    private projects: Array<Project> = new Array<Project>();

    public storeProject(project: Project): void {
        this.project = project;
    }

    public getProject(): Result<Project> {
        if (!this.project) {
            return Result.failure()
        }

        return Result.success(this.project);
    }

    public findProjectById(id: string): Result<Project> {
        const expectedProject = this.projects.find(project => project.id === id);
        if (!expectedProject) {
            return Result.failure()
        }

        return Result.success(expectedProject);
    }

    public storeProjects(project: Array<Project>): void {
        this.projects = project;
    }
       
    public createProject = async (createProjectRequest: CreateProjectRequest): Promise<Result<ProjectDTO>> => {
        const endpoint = 'cards/admin/projects/';

        const request = new PostProjectRequest(createProjectRequest);

        const response = await this._httpClient.post<PostProjectResponse, PostProjectRequest>(endpoint, request);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError)
        }
        
        const projectResponse = new CreateProjectResponse(response.data);
        return Result.success(projectResponse);
    }

    public loadProjects = async (): Promise<Result<Array<ProjectDTO>>> => {
        const endpoint = 'cards/admin/projects/';

        const response = await this._httpClient.get<Array<GetProjectResponse>>(endpoint);
        if (!response.isSuccess || !response.data) {
            return this.handleNetworkError(response.errors as NetworkError)
        }

        const dto = response.data.map(mapProjectResponseToDto);

        return Result.success(dto);
    }


    private handleNetworkError<T>(networkError: NetworkError): Result<T> {
      
        return Result.failure();
    }
}