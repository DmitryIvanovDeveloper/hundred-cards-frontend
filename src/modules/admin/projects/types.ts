const TYPES = {
    ProjectsPresenter: Symbol.for('ProjectsPresenter'),
    ProjectsController: Symbol.for('ProjectsController'),
    ProjectsRepository: Symbol.for('ProjectsRepository'),
    ProjectsService: Symbol.for('ProjectsService'),
    SelectProjectUseCase: Symbol.for('SelectProjectUseCase'),
    CreateProjectPresentConstructorUseCase: Symbol.for('CreateProjectPresentConstructorUseCase'),
    LoadPresentProjectsUseCase: Symbol.for('LoadPresentProjectsUseCase'),
    AdminAuthenticatedEventHandler: Symbol.for('IAsyncEventHandler<AdminAuthenticatedEvent>'),
};

export { TYPES };
