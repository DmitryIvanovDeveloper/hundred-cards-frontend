import ProjectDTO, { CreateProjectRequest } from "../dtos/project.dto";
import { CreateProjectInput } from "../usecases/types/create-project.type";

export default class Project {
    readonly id: string;
    readonly name: string;
    readonly created: Date;
    readonly userId: number;

    constructor(id: string, name: string, created: Date, userId: number) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.userId = userId;
    }

    static fromDto(dto: ProjectDTO): Project {
        return new Project(dto.id, dto.name, dto.created, dto.userId);
    }

    static toRequestDto(input: CreateProjectInput): CreateProjectRequest {
        return {
          name: input.name
        };
      }
}