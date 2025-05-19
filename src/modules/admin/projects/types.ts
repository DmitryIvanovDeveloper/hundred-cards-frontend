const TYPES = {
    ProjectsPresenter: Symbol.for('ProjectsPresenter'),
    ProjectsController: Symbol.for('ProjectsController'),
    ProjectsLocalRepository: Symbol.for('ProjectsLocalRepository'),
    ProjectsHttpRepository: Symbol.for('ProjectsHttpRepository'),
    DeleteProjectUseCase: Symbol.for('DeleteProjectUseCase'),
    DeleteProjectLocalUseCase: Symbol.for('DeleteProjectLocalUseCase'),
    ProjectsService: Symbol.for('ProjectsService'),
    SelectProjectUseCase: Symbol.for('SelectProjectUseCase'),
    CreateProjectPresentConstructorUseCase: Symbol.for('CreateProjectPresentConstructorUseCase'),
    LoadPresentProjectsUseCase: Symbol.for('LoadPresentProjectsUseCase'),
    UpdateProjectUseCase: Symbol.for('UpdateProjectUseCase'),
    LoadProjectsUseCase: Symbol.for('LoadProjectsUseCase'),
    AdminAuthenticatedEventHandler: Symbol.for('IAsyncEventHandler<AdminAuthenticatedEvent>'),
    SaveProjectEventHandler: Symbol.for('IAsyncEventHandler<SaveProjectEvent>'),
    ProjectDeletedEventHandler: Symbol.for('IAsyncEventHandler<ProjectDeletedEvent>'),
    ProjectCreatedEventHandler: Symbol.for('IAsyncEventHandler<ProjectCreatedEvent>'),
    ProjectsLoadedEventHandler: Symbol.for('IAsyncEventHandler<ProjectsLoadedEvent>'),
};

export { TYPES, };
