import AdminAuthenticatedEvent from '@/modules/shared/authentication/business/events/admin-authenticated.event';
import { TYPES } from '../../types';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import { IAsyncEventHandler } from '@/infrastructure/events/events-handler.plugin';
import AdminAuthenticatedEventLaodProjectsHandler from '../../business/events/handlers/admin-authenticated-event-load-projects.handler';
import ProjectsPresenter from '../../presentation/presenter/projects.presenter';
import ProjectsController from '../../presentation/controller/projects.controller';
import CreatePresentProjectUseCase from '../../business/usecases/create-present-project.usecase';
import ProjectsRepository from '../repositories/projects.repository';
import IProjectsRepository from '../../business/plugins/projects.repository.plugin';
import LoadPresentProjectsUseCase from '../../business/usecases/load-present-projects.usecase';
import ProjectsService from '../../business/services/project.service';
import IProjectsService from '../../business/plugins/projects.service.plugin';
import SelectProjectUseCase from '../../business/usecases/select-project.usecase';

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
    .bind<CreatePresentProjectUseCase>(TYPES.CreateProjectPresentConstructorUseCase)
    .to(CreatePresentProjectUseCase)
    .inTransientScope()
;

container
    .bind<LoadPresentProjectsUseCase>(TYPES.LoadPresentProjectsUseCase)
    .to(LoadPresentProjectsUseCase)
    .inTransientScope()
;

container
    .bind<SelectProjectUseCase>(TYPES.SelectProjectUseCase)
    .to(SelectProjectUseCase)
    .inTransientScope()
;


container
    .bind<IProjectsRepository>(TYPES.ProjectsRepository)
    .to(ProjectsRepository)
    .inSingletonScope()
;

container
    .bind<IAsyncEventHandler<AdminAuthenticatedEvent>>(TYPES.AdminAuthenticatedEventHandler)
    .to(AdminAuthenticatedEventLaodProjectsHandler)
    .inTransientScope()
;
