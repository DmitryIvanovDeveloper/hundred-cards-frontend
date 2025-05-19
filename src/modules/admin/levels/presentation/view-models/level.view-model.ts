import Level from "../../business/entities/level";

export default class LevelViewModel {
    readonly id: string;
    readonly name: string;
    readonly deleting: boolean;
    readonly edited: boolean;

    constructor(level: Level) {
        this.id = level.id;
        this.name = level.name;
        this.edited = level.edited;
        this.deleting = level.deleting;
    }
}