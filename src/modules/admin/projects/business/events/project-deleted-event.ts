import { IEvent } from "@/infrastructure/events/event";

export default class ProjectDeletedEvent implements IEvent {
    public readonly projectId: string;
    
    constructor(projectId: string) {
        this.projectId = projectId;
    }
}