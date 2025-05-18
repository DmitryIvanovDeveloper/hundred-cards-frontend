import Result from "@/infrastructure/helpers/result";
import Level from "../../business/entities/level";
import ILevelsLocalRepository from "../../business/plugins/levels.local.repository.plugin";
import { ref, Ref } from "vue";
import LevelNotFoundError from "../../business/errors/level-not-found.error";

export default class LevelsLocalRepository implements ILevelsLocalRepository  {
    
    private _levels = ref<Array<Level>>([]);


    private _level = ref<Level>();

    public storeLevels(levels: Array<Level>): void {
        this._levels.value = levels;
    }

    public addLevel(level: Level): void {
       this._levels.value.push(level);
    }

    public updateLevel(updatedLevel: Level): void {
        const index = this._levels.value.findIndex((question) => question.id === updatedLevel.id);
        if (index === -1) {
            return;
        }

        this._levels.value[index] = updatedLevel;
     }

    public storeLevel(level: Level): void {
        this._level.value = level;
        console.log(this._level.value)
    }

    public getLevels(): Ref<Array<Level>> {
        return this._levels;
    }

    public getLevel(): Ref<Level | undefined> {
        return this._level;
    }

    public findLevelById(id: string): Result<Level> {
        const expetedLevel = this._levels.value?.find(level => level.id === id);
        if (!expetedLevel) {
            return Result.failure(new LevelNotFoundError(id))
        }

        return Result.success(expetedLevel);
    }
}