import Level from "../../business/entities/level";

export default class LevelViewModel {
    readonly id: string;
    readonly name: string;

    constructor(level: Level) {
        this.id = level.id;
        this.name = level.name;
    }
}