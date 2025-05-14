import { inject } from "inversify";
import ILevelsLocalRepository from "../../business/plugins/levels.local.repository.plugin";
import { TYPES } from "../../types";
import LevelViewModel from "../view-models/level.view-model";
import { computed } from "vue";

export default class LevelsPresenter  {
   
    constructor(
        @inject(TYPES.LevelsLocalRepository)
        private readonly _repository: ILevelsLocalRepository
    ) {}
      
    public readonly labels = {
        title: 'Категории',
        categoryName: 'Название категории'
    }

    public levelViewModel =  computed(() => this.presentLevel());
    public levelsViewModel = computed(() => this.presentLevels());
    
    private presentLevels(): Array<LevelViewModel> {
        return this._repository
            .getLevels().value
            .map(level => new LevelViewModel(level))
        ;
    }

    private presentLevel(): LevelViewModel | null {
        const level = this._repository.getLevel().value;
        if (!level) {
            return null;
        }

        return new LevelViewModel(level);
    }
} 