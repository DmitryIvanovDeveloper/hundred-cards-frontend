import {
    ILevelCreateRequestDTO,
    ILevelCreateResponseDTO,
} from "../dtos/level.create.dto";
import { ILevelUpdateRequestDTO } from "../dtos/level.update.dto";

export interface LevelProps {
    id: string;
    name: string;
    lang: string;
    projectId: string;
    edited: boolean;
    deleting: boolean;
}

export default class Level {
    readonly id: string;
    readonly name: string;
    readonly lang: string;
    readonly projectId: string;
    readonly edited: boolean;
    readonly deleting: boolean;

    constructor(
        id: string,
        name: string,
        lang: string,
        projectId: string,
        edited: boolean = false,
        deleting: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.lang = lang;
        this.projectId = projectId;
        this.edited = edited;
        this.deleting = deleting;
    }

    public withUpdatedName(name: string): this {
        return this.cloneWith({ name, edited: true });
    }

    public withUpdatedDeleting(deleting: boolean): this {
        return this.cloneWith({ deleting });
    }

    public withUpdatedEdited(edited: boolean): this {
        return this.cloneWith({ edited });
    }

    public cloneWith(params: Partial<LevelProps>): this {
        return new Level(
            this.id,
            params.name ?? this.name,
            params.lang ?? this.lang,
            params.projectId ?? this.projectId,
            params.edited ?? this.edited,
            params.deleting ?? this.deleting
        ) as this;
    }

    public toCreateRequest(): ILevelCreateRequestDTO {
        return {
            level: this.name,
            lang: this.lang,
            projectId: this.projectId,
        };
    }

    public toUpdateRequest(): ILevelUpdateRequestDTO {
        return {
            level: this.name,
            lang: this.lang,
            projectId: this.projectId,
        };
    }

    public toResponseDto(): ILevelCreateResponseDTO {
        return {
            id: this.id,
            level: this.name,
            lang: this.lang,
            projectId: this.projectId,
        };
    }

    static toEntity(dto: ILevelCreateResponseDTO): Level {
        return new Level(dto.id, dto.level, dto.lang, dto.projectId);
    }

    static create(name: string, lang: string, projectId: string): Level {
        return new Level("", name, lang, projectId);
    }
}
