import { CreateProjectRequest } from "../../../business/dtos/project.dto";

export default class PostProjectRequest {
    readonly name: string;

    constructor(request: CreateProjectRequest) {
        this.name = request.name;
    }
}