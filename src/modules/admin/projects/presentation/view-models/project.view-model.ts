import Project from "../../business/entities/project";

export default class ProjectViewModel {
    readonly id: string;
    readonly name: string;
    readonly created: Date;

    constructor(project: Project) {
        this.id = project.id;
        this.name = project.name;
        this.created = project.created;
    }
}