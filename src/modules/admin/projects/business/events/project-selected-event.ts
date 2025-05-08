import { IEvent } from "@/infrastructure/events/event";

export default class ProjectSelectedEvent implements IEvent {
    readonly projectId: string;
    
    constructor(projectId: string) {
        this.projectId = projectId;
    }
}