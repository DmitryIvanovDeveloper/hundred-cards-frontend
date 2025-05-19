import CreateProjectResponseDTO from "../dtos/create-project.dto";
import { CreateProjectRequestDTO } from "../dtos/create-project.dto";
import UpdateProjectResponseDTO from "../dtos/update-project.dto";
import { CreateProjectInput } from "../usecases/types/create-project.type";

export interface ProjectProps {
    id: string;
    name: string;
    created: Date;
    userId: number;
    edited: boolean;
    deleting: boolean;
}

export default class Project {
    readonly id: string;
    readonly name: string;
    readonly created: Date;
    readonly userId: number;
    readonly edited: boolean;
    readonly deleting: boolean;

    constructor(id: string, name: string, created: Date, userId: number, edited: boolean = false, deleting: boolean = false) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.userId = userId;
        this.edited = edited;
        this.deleting = deleting;
    }

    public withUpdatedName(name: string): this {
        return this.cloneWith({ name, edited: true });
    }

    public withUpdatedDeleting(deleting: boolean): this {
        return this.cloneWith({ deleting });
    }

    public cloneWith(params: Partial<ProjectProps>): this {
        return new Project(
            this.id,
            params.name ?? this.name,
            params.created ?? this.created,
            params.userId ?? this.userId,
            params.edited ?? this.edited,
            params.deleting ?? this.deleting
        ) as this;
    }

    static toEntity(dto: CreateProjectResponseDTO | UpdateProjectResponseDTO): Project {
        return new Project(dto.id, dto.name, dto.created, dto.userId);
    }

    static toRequestDto(input: CreateProjectInput): CreateProjectRequestDTO {
        return {
            name: input.name
        };
    }
}
