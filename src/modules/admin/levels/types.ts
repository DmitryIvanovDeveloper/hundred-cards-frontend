const TYPES = {
    LevelsPresenter: Symbol.for('LevelsPresenter'),
    LevelsController: Symbol.for('LevelsController'),
    LevelsRepository: Symbol.for('LevelsRepository'),
    LevelsService: Symbol.for('LevelService'),
    LoadPresentLevelsUseCase: Symbol.for('LoadPresentLevelsUseCase'),
    SelectLevelUseCase: Symbol.for('SelectLevelUseCase'),
    CreateLevelUseCase: Symbol.for('CreateLevelUseCase'),
    InitializeLevelsUseCase: Symbol.for('InitializeLevelsUseCase'),
    ProjectSelectedEventHandler: Symbol.for('IAsyncEventHandler<ProjectSelectedEvent>'),
};

export { TYPES };
