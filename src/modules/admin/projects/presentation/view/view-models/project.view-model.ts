import Project from "../../../business/entities/project";

export default class ProjectViewModel {
    readonly id: string;
    readonly name: string;
    readonly created: Date;
    readonly edited: boolean;

    constructor(project: Project) {
        this.id = project.id;
        this.name = project.name;
        this.created = project.created;
        this.edited = project.edited;
    }
}