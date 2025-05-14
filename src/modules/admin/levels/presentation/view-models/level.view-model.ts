import Level from "../../business/entities/level";

export default class LevelViewModel {
    readonly id: string;
    readonly name: string;
    readonly edited: boolean;

    constructor(level: Level) {
        this.id = level.id;
        this.name = level.name;
        this.edited = level.edited;
    }
}