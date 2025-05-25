import Project from "../../../business/entities/project";
import { User } from "../../../business/entities/user";

export default class ProjectViewModel {
    readonly id: string;
    readonly name: string;
    readonly created: Date | undefined;
    readonly edited: boolean;
    readonly deleting: boolean;
    readonly users: Array<UserViewModel>;

    constructor(project: Project) {
        this.id = project.id;
        this.name = project.name;
        this.created = project.created ?? undefined;
        this.edited = project.edited;
        this.deleting = project.deleting;
        this.users = project.users.map(user => new UserViewModel(user))
    }
}

export class UserViewModel {
    readonly id: string;
    readonly email: string;
    readonly access: boolean;

    constructor(user: User) {
        this.id = user.id
        this.email = user.email
        this.access = user.access
    }
}

