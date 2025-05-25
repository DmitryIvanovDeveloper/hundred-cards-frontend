import CreateProjectResponseDTO from "../dtos/create-project.dto";
import { CreateProjectRequestDTO } from "../dtos/create-project.dto";
import UpdateProjectResponseDTO from "../dtos/update-project.dto";
import { CreateProjectInput } from "../usecases/types/create-project.type";
import { User } from "./user";
import { v4 as uuid } from 'uuid';

export interface IProjectProps {
    id?: string;
    name?: string;
    created?: Date | undefined;
    userId?: number;
    edited?: boolean;
    deleting?: boolean;
    users?: ReadonlyArray<User>;
}


export default class Project {
    readonly id: string;
    readonly name: string;
    readonly created: Date | undefined;
    readonly userId: number;
    readonly edited: boolean;
    readonly deleting: boolean;
    readonly users: ReadonlyArray<User>

    constructor(props: Partial<IProjectProps>) {
        this.id = props.id ?? uuid();
        this.name = props.name ?? '';
        this.created = props.created ?? undefined;
        this.userId = props.userId ?? -1;
        this.edited = props.edited ?? false;
        this.deleting = props.deleting ?? false;
        this.users = props.users ?? []
    }

    public withUpdatedName(name: string): this {
        return this.cloneWith({ name, edited: true });
    }

    public withUpdatedDeleting(deleting: boolean): this {
        return this.cloneWith({ deleting });
    }

    public withUpdatedUserAccess(user: User): this {
        const updatedUser = [...this.users, user]
        return this.cloneWith({ users: updatedUser });
    }

    public withUpdatedRemovedUser(id: string): this {
        const updatedUsers = this.users.filter(userAccess => userAccess.id !== id);
        return this.cloneWith({ users: updatedUsers });
    }

    public withUpdatedNewUser(email: string): this {
        const updatedUsers = [...this.users, new User({ email })];
        return this.cloneWith({ users: updatedUsers });
    }

    public cloneWith(params: Partial<IProjectProps>): this {
        return new Project({
            id: this.id,
            name: params.name ?? this.name,
            created: params.created ?? this.created,
            userId: params.userId ?? this.userId,
            edited: params.edited ?? this.edited,
            deleting: params.deleting ?? this.deleting,
            users: params.users ?? this.users,
        }) as this;
    }

    static toEntity(dto: CreateProjectResponseDTO | UpdateProjectResponseDTO): Project {
        return new Project({
            id: dto.id, 
            name: dto.name, 
            created: dto.created, 
            userId: dto.userId
        });
    }

    static toRequestDto(input: CreateProjectInput): CreateProjectRequestDTO {
        return {
            name: input.name
        };
    }
}
