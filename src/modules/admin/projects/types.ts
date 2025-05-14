const TYPES = {
    ProjectsPresenter: Symbol.for('ProjectsPresenter'),
    ProjectsController: Symbol.for('ProjectsController'),
    ProjectsLocalRepository: Symbol.for('ProjectsLocalRepository'),
    ProjectsHttpRepository: Symbol.for('ProjectsHttpRepository'),
    ProjectsService: Symbol.for('ProjectsService'),
    SelectProjectUseCase: Symbol.for('SelectProjectUseCase'),
    CreateProjectPresentConstructorUseCase: Symbol.for('CreateProjectPresentConstructorUseCase'),
    LoadPresentProjectsUseCase: Symbol.for('LoadPresentProjectsUseCase'),
    UpdateProjectUseCase: Symbol.for('UpdateProjectUseCase'),
    AdminAuthenticatedEventHandler: Symbol.for('IAsyncEventHandler<AdminAuthenticatedEvent>'),
    SaveProjectEventHandler: Symbol.for('IAsyncEventHandler<SaveProjectEvent>'),
};

export { TYPES, };
