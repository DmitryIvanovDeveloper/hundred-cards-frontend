import { ref } from "vue";
import Level from "../../business/entities/level";
import ILevelsPresenter from "../../business/plugins/levels.presenter.plugin";
import LevelViewModel from "../view-models/level.view-model";

export default class LevelsPresenter implements ILevelsPresenter {
   

    public readonly levelsViewModel = ref<Array<LevelViewModel>>([]);
    public readonly levelViewModel = ref<LevelViewModel>();
    
    public presentLevels(levels: Array<Level>): void {
       this.levelsViewModel.value = levels.map(level => new LevelViewModel(level));
    }

    public presentLevel(level: Level): void {
        this.levelViewModel.value = new LevelViewModel(level);
    }
} 