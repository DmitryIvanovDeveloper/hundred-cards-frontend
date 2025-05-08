
const TYPES = {
    QuestionsPresenter: Symbol.for('QuestionsPresenter'),
    QuestionsController: Symbol.for('QuestionsController'),
    QuestionsRepository: Symbol.for('QuestionsRepository'),
    LoadPresentQuestionsUseCase: Symbol.for('LoadPresentQuestionsUseCase'),
    CreateQuestionUseCase: Symbol.for('CreateQuestionUseCase'),
    InitializeQuestionsUseCase: Symbol.for('InitializeQuestionsUseCase'),
    SelectQuestionUseCase: Symbol.for('SelectQuestionUseCase'),
    LevelSelectedEventHandler: Symbol.for('IAsyncEventHandler<LevelSelectedEvent>'),
};

export { TYPES };
