import { TYPES } from '../../types';

import { container } from '@/infrastructure/bootstrap/inversify.config';
import { IAsyncEventHandler, ISyncEventHandler } from '@/infrastructure/events/events-handler.plugin';
import LoadQuestionsUseCase from '../../business/usecases/load-questons.usecase';
import IQuestionsHttpRepository from '../../business/plugins/questions.http.repository.plugin';
import QuestionsPresenter from '../../presentation/presenter/questions.presenter';
import QuestionsController from '../../presentation/controller/questions.controller';
import LevelSelectedEventLoadQuestionsHandler from '../../business/events/handlers/level-selected-event-load-questions.handler';
import LevelSelectedEvent from '@/modules/admin/levels/business/events/level-selected-event';
import SelectQuestionUseCase from '../../business/usecases/select-question.usecase';
import CreateQuestionUseCase from '../../business/usecases/create-question.usecase';
import UpdateQuestionUseCase from '../../business/usecases/update-question.usecase';
import IQuestionsLocalRepository from '../../business/plugins/questions.local.repository.plugin';
import QuestionsLocalRepository from '../repositories/questions.local.repository';
import QuestionsHttpRepository from '../repositories/questions.http.repository';
import PreviousQuestionUseCase from '../../business/usecases/previous-question.usecase';
import NextQuestionUseCase from '../../business/usecases/next-question.usecase';
import SaveProjectEvent from '@/modules/admin/projects/business/events/save-project-event';
import SaveProjectEventUpdateQuestionHandler from '../../business/events/handlers/save-project-event-update-question.handler';
import NextQuestionEvent from '../../business/events/next-question-event';
import NextQuestionEventSetNextQuestionHandler from '../../business/events/handlers/next-question-event-set-next-question.handler';
import PreviouseQuestionEvent from '../../business/events/previous-question-event';
import PreviousQuestionEventSetPreviousQuestionHandler from '../../business/events/handlers/previous-question-event-set-previous-question.handler';
import LevelCreatedEvent from '@/modules/admin/levels/business/events/level-created-event';
import LevelCreatedEventCreateDefaultQuestionHandler from '../../business/events/handlers/level-created-event-create-defult-question.handler';

container
    .bind<QuestionsPresenter>(TYPES.QuestionsPresenter)
    .to(QuestionsPresenter)
    .inSingletonScope()
;
container
    .bind<QuestionsController>(TYPES.QuestionsController)
    .to(QuestionsController)
    .inSingletonScope()
;

container
    .bind<LoadQuestionsUseCase>(TYPES.LoadPresentQuestionsUseCase)
    .to(LoadQuestionsUseCase)
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
    .bind<UpdateQuestionUseCase>(TYPES.UpdateQuestionUseCase)
    .to(UpdateQuestionUseCase)
    .inTransientScope()
;

container
    .bind<PreviousQuestionUseCase>(TYPES.PreviousQuestionUseCase)
    .to(PreviousQuestionUseCase)
    .inTransientScope()
;

container
    .bind<NextQuestionUseCase>(TYPES.NextQuestionUseCase)
    .to(NextQuestionUseCase)
    .inTransientScope()
;

container
    .bind<IQuestionsLocalRepository>(TYPES.QuestionsLocalRepository)
    .to(QuestionsLocalRepository)
    .inSingletonScope()
;

container
    .bind<IQuestionsHttpRepository>(TYPES.QuestionsHttpRepository)
    .to(QuestionsHttpRepository)
    .inSingletonScope()
;

container
    .bind<IAsyncEventHandler<LevelSelectedEvent>>(TYPES.LevelSelectedEventHandler)
    .to(LevelSelectedEventLoadQuestionsHandler)
    .inTransientScope()
;

container
    .bind<IAsyncEventHandler<SaveProjectEvent>>(TYPES.SaveProjectEventHandler)
    .to(SaveProjectEventUpdateQuestionHandler)
    .inTransientScope()
;


container
    .bind<IAsyncEventHandler<LevelCreatedEvent>>(TYPES.LevelCreatedEventHandler)
    .to(LevelCreatedEventCreateDefaultQuestionHandler)
    .inTransientScope()
;

container
    .bind<ISyncEventHandler<NextQuestionEvent>>(TYPES.NextQuestionEventHandler)
    .to(NextQuestionEventSetNextQuestionHandler)
    .inTransientScope()
;

container
    .bind<ISyncEventHandler<PreviouseQuestionEvent>>(TYPES.PreviousQuestionEventHandler)
    .to(PreviousQuestionEventSetPreviousQuestionHandler)
    .inTransientScope()
;

