import { TYPES } from '../../types';

import { container } from '@/infrastructure/bootstrap/inversify.config';
import { IAsyncEventHandler } from '@/infrastructure/events/events-handler.plugin';
import ILevelsPresenter from '../../business/plugins/levels.presenter.plugin';
import LevelsPresenter from '../../presentation/presenter/levels.presenter';
import LevelsController from '../../presentation/controller/levels.controller';
import LoadPresentLevelsUseCase from '../../business/usecases/load-present-levels.usecase';
import ILevelsRepository from '../../business/plugins/levels.repository.plugin';
import LevelsRepository from '../repositories/levels.repository';
import ProjectSelectedEvent from '@/modules/admin/projects/business/events/project-selected-event';
import ProjectSelectedEventLoadLevelsHandler from '../../business/events/handlers/project-selected-event-load-levels.handler';
import SelectLevelUseCase from '../../business/usecases/select-level.usecase';
import CreateLevelUseCase from '../../business/usecases/create-level.usecase';
import LevelService from '../../business/services/level.service';
import InitializeLevelsUseCase from '../../business/usecases/initialize-levels.usecase';

container
    .bind<ILevelsPresenter>(TYPES.LevelsPresenter)
    .to(LevelsPresenter)
    .inSingletonScope()
;

container
    .bind<LevelsController>(TYPES.LevelsController)
    .to(LevelsController)
    .inSingletonScope()
;

container
    .bind<LevelService>(TYPES.LevelsService)
    .to(LevelService)
    .inSingletonScope()
;

container
    .bind<LoadPresentLevelsUseCase>(TYPES.LoadPresentLevelsUseCase)
    .to(LoadPresentLevelsUseCase)
    .inTransientScope()
;

container
    .bind<InitializeLevelsUseCase>(TYPES.InitializeLevelsUseCase)
    .to(InitializeLevelsUseCase)
    .inTransientScope()
;

container
    .bind<SelectLevelUseCase>(TYPES.SelectLevelUseCase)
    .to(SelectLevelUseCase)
    .inTransientScope()
;

container
    .bind<CreateLevelUseCase>(TYPES.CreateLevelUseCase)
    .to(CreateLevelUseCase)
    .inTransientScope()
;

container
    .bind<ILevelsRepository>(TYPES.LevelsRepository)
    .to(LevelsRepository)
    .inSingletonScope()
;

container
    .bind<IAsyncEventHandler<ProjectSelectedEvent>>(TYPES.ProjectSelectedEventHandler)
    .to(ProjectSelectedEventLoadLevelsHandler)
    .inTransientScope()
;
