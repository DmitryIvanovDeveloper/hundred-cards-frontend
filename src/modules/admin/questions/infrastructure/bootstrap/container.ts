import { TYPES } from '../../types';

import { container } from '@/infrastructure/bootstrap/inversify.config';
import { IAsyncEventHandler } from '@/infrastructure/events/events-handler.plugin';
import LoadPresentQuestionsUseCase from '../../business/usecases/load-present-questons.usecase';
import IQuestionsRepository from '../../business/plugins/questions.repository.plugin';
import QuestionsRepository from '../repositories/questions.repository';
import IQuestionPresenter from '../../business/plugins/questions.presenter.plugin';
import QuestionsPresenter from '../../presentation/presenter/questions.presenter';
import QuestionsController from '../../presentation/controller/questions.controller';
import LevelSelectedEventLoadQuestionsHandler from '../../business/events/handlers/project-selected-event-load-levels.handler';
import LevelSelectedEvent from '@/modules/admin/levels/business/events/level-selected-event';
import SelectQuestionUseCase from '../../business/usecases/select-question.usecase';
import CreateQuestionUseCase from '../../business/usecases/create-question.usecase';
import InitializeQuestionsUseCase from '../../business/usecases/initialize-questions.usecase';

container
    .bind<IQuestionPresenter>(TYPES.QuestionsPresenter)
    .to(QuestionsPresenter)
    .inSingletonScope()
;
container
    .bind<QuestionsController>(TYPES.QuestionsController)
    .to(QuestionsController)
    .inSingletonScope()
;

container
    .bind<LoadPresentQuestionsUseCase>(TYPES.LoadPresentQuestionsUseCase)
    .to(LoadPresentQuestionsUseCase)
    .inTransientScope()
;

container
    .bind<SelectQuestionUseCase>(TYPES.SelectQuestionUseCase)
    .to(SelectQuestionUseCase)
    .inTransientScope()
;

container
    .bind<CreateQuestionUseCase>(TYPES.CreateQuestionUseCase)
    .to(CreateQuestionUseCase)
    .inTransientScope()
;


container
    .bind<InitializeQuestionsUseCase>(TYPES.InitializeQuestionsUseCase)
    .to(InitializeQuestionsUseCase)
    .inTransientScope()
;

container
    .bind<IQuestionsRepository>(TYPES.QuestionsRepository)
    .to(QuestionsRepository)
    .inSingletonScope()
;

container
    .bind<IAsyncEventHandler<LevelSelectedEvent>>(TYPES.LevelSelectedEventHandler)
    .to(LevelSelectedEventLoadQuestionsHandler)
    .inTransientScope()
;
