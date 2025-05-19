import AdminAuthenticatedEvent from '@/modules/shared/authentication/business/events/admin-authenticated.event';
import { IAsyncEventHandler } from '@/infrastructure/events/events-handler.plugin';
import AdminAuthenticatedEventLaodProjectsHandler from '../../business/events/handlers/admin-authenticated-event-load-projects.handler';
import ProjectsPresenter from '../../presentation/presenter/projects.presenter';
import ProjectsController from '../../presentation/controller/projects.controller';
import CreateProjectUseCase from '../../business/usecases/create-project.usecase';
import ProjectsLocalRepository from '../repositories/projects.local.repository';
import IProjectsHttpRepository from '../../business/plugins/projects.http.repository.plugin';
import LoadProjectsUseCase from '../../business/usecases/load-projects.usecase';
import IProjectsService from '../../business/plugins/projects.service.plugin';
import SelectProjectUseCase from '../../business/usecases/select-project.usecase';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import IProjectsLocalRepository from '../../business/plugins/projects.local.repository.plugin';
import ProjectsHttpRepository from '../repositories/projects.http.repository';
import ProjectsService from '../../services/project.service';
import { TYPES } from '../../types';
import SaveProjectEvent from '../../business/events/save-project-event';
import SaveProjectEventUpdateProjectHandler from '../../business/events/handlers/save-project-event-update-project.handler';
import UpdateProjectUseCase from '../../business/usecases/update-project.usecase';
import DeleteProjectUseCase from '../../business/usecases/delete-project.usecase';
import ProjectDeletedEvent from '../../business/events/project-deleted-event';
import ProjectCreatedEvent from '../../business/events/project-created-event';
import ProjectCreatedEventSelectProjectHandler from '../../business/events/handlers/project-created-event-select-project.handler';
import ProjectsLoadedEvent from '../../business/events/projects-loaded-event';
import ProjectsLoadedEventSelectDefaultProjectHandler from '../../business/events/handlers/project-loaded-event-select-default-project.handler';
import ProjectDeletedEventLoadProjectsHandler from '../../business/events/handlers/project-deleted-event-load-projects.handler';
import DeleteProjectLocalUseCase from '../../business/usecases/delete-project-local.usecase';

container
    .bind<ProjectsPresenter>(TYPES.ProjectsPresenter)
    .to(ProjectsPresenter)
    .inSingletonScope()
;

container
    .bind<ProjectsController>(TYPES.ProjectsController)
    .to(ProjectsController)
    .inSingletonScope()
;

container
    .bind<IProjectsService>(TYPES.ProjectsService)
    .to(ProjectsService)
    .inTransientScope()
;

container
    .bind<CreateProjectUseCase>(TYPES.CreateProjectPresentConstructorUseCase)
    .to(CreateProjectUseCase)
    .inTransientScope()
;

container
    .bind<LoadProjectsUseCase>(TYPES.LoadPresentProjectsUseCase)
    .to(LoadProjectsUseCase)
    .inTransientScope()
;

container
    .bind<SelectProjectUseCase>(TYPES.SelectProjectUseCase)
    .to(SelectProjectUseCase)
    .inTransientScope()
;

container
    .bind<UpdateProjectUseCase>(TYPES.UpdateProjectUseCase)
    .to(UpdateProjectUseCase)
    .inTransientScope()
;

container
    .bind<DeleteProjectUseCase>(TYPES.DeleteProjectUseCase)
    .to(DeleteProjectUseCase)
    .inTransientScope()
;

container
    .bind<DeleteProjectLocalUseCase>(TYPES.DeleteProjectLocalUseCase)
    .to(DeleteProjectLocalUseCase)
    .inTransientScope()
;

container
    .bind(TYPES.LoadProjectsUseCase)
    .to(LoadProjectsUseCase)
    .inTransientScope()
;


container
  .bind<IProjectsLocalRepository>(TYPES.ProjectsLocalRepository)
  .to(ProjectsLocalRepository)
  .inSingletonScope()
;

container
  .bind<IProjectsHttpRepository>(TYPES.ProjectsHttpRepository)
  .to(ProjectsHttpRepository)
  .inSingletonScope()
;

container
    .bind<IAsyncEventHandler<AdminAuthenticatedEvent>>(TYPES.AdminAuthenticatedEventHandler)
    .to(AdminAuthenticatedEventLaodProjectsHandler)
    .inTransientScope()
;

container
    .bind<IAsyncEventHandler<ProjectDeletedEvent>>(TYPES.ProjectDeletedEventHandler)
    .to(ProjectDeletedEventLoadProjectsHandler)
    .inTransientScope()
;

container
    .bind<IAsyncEventHandler<SaveProjectEvent>>(TYPES.SaveProjectEventHandler)
    .to(SaveProjectEventUpdateProjectHandler)
    .inTransientScope()
;

container
    .bind<IAsyncEventHandler<ProjectCreatedEvent>>(TYPES.ProjectCreatedEventHandler)
    .to(ProjectCreatedEventSelectProjectHandler)
    .inTransientScope()
;

container
    .bind<IAsyncEventHandler<ProjectsLoadedEvent>>(TYPES.ProjectsLoadedEventHandler)
    .to(ProjectsLoadedEventSelectDefaultProjectHandler)
    .inTransientScope()
;


