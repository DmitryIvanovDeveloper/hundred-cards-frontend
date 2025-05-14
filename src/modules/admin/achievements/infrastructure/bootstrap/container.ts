import { container } from '@/infrastructure/bootstrap/inversify.config';

import IAchievementsHttpRepository from '@/modules/admin/achievements/business/plugins/achievements.http.repository.plugin';
import IAchievementsLocalRepository from '@/modules/admin/achievements/business/plugins/achievements.local-repository.plugin';
import AchievementsPresenter from '@/modules/admin/achievements/presentation/presenter/achievements.presenter';
import AchievementsController from '@/modules/admin/achievements/presentation/controller/achievements.controller';
import AchievementsHttpRepository from '../repositories/achievements.http.repository';
import AchievementsLocalRepository from '../repositories/achievements.local.repository';
import LoadAchievementsUseCase from '../../business/usecases/load-achievements.usecase';
import { IAsyncEventHandler } from '@/infrastructure/events/events-handler.plugin';
import ProjectSelectedEvent from '@/modules/admin/projects/business/events/project-selected-event';
import ProjectSelectedEventLoadAchievementsHandler from '../../business/events/handlers/project-selected-event-load-achievements.handler';
import { TYPES } from '../../types';
import SelectAchievementUseCase from '../../business/usecases/select-achievements.usecase';
import CreateAchievementUseCase from '../../business/usecases/create-achievement.usecase';
import PreviousAchievementUseCase from '../../business/usecases/previous-achievement.usecase';
import NextAchievementUseCase from '../../business/usecases/next-achievement.usecase';

container
  .bind<IAchievementsHttpRepository>(TYPES.AchievementsHttpRepository)
  .to(AchievementsHttpRepository)

container
  .bind<IAchievementsLocalRepository>(TYPES.AchievementsLocalRepository)
  .to(AchievementsLocalRepository)
  .inSingletonScope();

container
  .bind(TYPES.AchievementsPresenter)
  .to(AchievementsPresenter)
  .inSingletonScope();

container
  .bind(TYPES.AchievementsController)
  .to(AchievementsController)
  .inSingletonScope();

container
  .bind(TYPES.LoadAchievementsUseCase)
  .to(LoadAchievementsUseCase)
  .inTransientScope();

container
  .bind(TYPES.SelectAchievementUseCase)
  .to(SelectAchievementUseCase)
.inTransientScope()
;

container
  .bind(TYPES.CreateAchievementUseCase)
  .to(CreateAchievementUseCase)
  .inTransientScope()
;

container
  .bind(TYPES.PreviousAchievementUseCase)
  .to(PreviousAchievementUseCase)
  .inTransientScope()
;

container
  .bind(TYPES.NextAchievementUseCase)
  .to(NextAchievementUseCase)
  .inTransientScope()
;


  
container
    .bind<IAsyncEventHandler<ProjectSelectedEvent>>(TYPES.ProjectSelectedEventHandler)
    .to(ProjectSelectedEventLoadAchievementsHandler)
    .inTransientScope()
;



