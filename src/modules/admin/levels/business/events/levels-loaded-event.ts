import { IEvent } from "@/infrastructure/events/event";

export default class LevelsLoadedEvent implements IEvent {
    readonly levels: ReadonlyArray<{id: string, name: string}>;
    
    constructor(levels: ReadonlyArray<{id: string, name: string}>) {
        this.levels = levels;
    }
}