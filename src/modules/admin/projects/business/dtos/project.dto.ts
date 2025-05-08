import PostProjectResponse from "../../infrastructure/repositories/dtos/post-project.response";

export default class CreateProjectResponse {
    readonly id: string;
    readonly name: string;
    readonly created: Date;
    readonly userId: number;

    constructor(response: PostProjectResponse) {
        this.id = response.id;
        this.name = response.name;
        this.created = response.created;
        this.userId = response.user_id;
    }
}

export class CreateProjectRequest {
    readonly name: string;
}