import Level from "../entities/level";

export default interface ILevelsPresenter {
    presentLevel(level: Level): void;
    presentLevels(levels: Array<Level>): void;
}