const TYPES = {
    LevelsPresenter: Symbol.for('LevelsPresenter'),
    LevelsController: Symbol.for('LevelsController'),
    LevelsHttpRepository: Symbol.for('LevelsHttpRepository'),
    LevelsLocalRepository: Symbol.for('LevelsLocalRepository'),
    LevelsService: Symbol.for('LevelService'),
    LoadPresentLevelsUseCase: Symbol.for('LoadPresentLevelsUseCase'),
    SelectLevelUseCase: Symbol.for('SelectLevelUseCase'),
    CreateLevelUseCase: Symbol.for('CreateLevelUseCase'),
    UpdateLevelUseCase:  Symbol.for('UpdateLevelUseCase'),
    DeleteLevelUseCase: Symbol.for('DeleteLevelUseCase'),
    ProjectSelectedEventHandler: Symbol.for('IAsyncEventHandler<ProjectSelectedEvent>'),
    SaveProjectEventHandler: Symbol.for('IAsyncEventHandler<SaveProjectEvent>'),
    ProjectCreatedEventHandler: Symbol.for('IAsyncEventHandler<ProjectCreatedEvent>'),
    LevelCreatedEventHandler: Symbol.for('IAsyncEventHandler<LevelCreatedEvent>'),
    
};

export { TYPES };
