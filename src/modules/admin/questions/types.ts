
const TYPES = {
    QuestionsPresenter: Symbol.for('QuestionsPresenter'),
    QuestionsController: Symbol.for('QuestionsController'),
    QuestionsHttpRepository: Symbol.for('QuestionsHttpRepository'),
    QuestionsLocalRepository: Symbol.for('QuestionsLocalRepository'),
    LoadPresentQuestionsUseCase: Symbol.for('LoadPresentQuestionsUseCase'),
    CreateQuestionUseCase: Symbol.for('CreateQuestionUseCase'),
    InitializeQuestionsUseCase: Symbol.for('InitializeQuestionsUseCase'),
    SelectQuestionUseCase: Symbol.for('SelectQuestionUseCase'),
    UpdateQuestionUseCase: Symbol.for('UpdateQuestionUseCase'),
    LevelSelectedEventHandler: Symbol.for('IAsyncEventHandler<LevelSelectedEvent>'),
    SaveProjectEventHandler: Symbol.for('IAsyncEventHandler<SaveProjectEvent>'),
    NextQuestionEventHandler: Symbol.for('ISyncEventHandler<NextQuestionEvent>'),
    PreviousQuestionEventHandler: Symbol.for('ISyncEventHandler<PreviouseQuestionEvent>'),
    NextQuestionUseCase: Symbol.for('NextQuestionUseCase'),
    PreviousQuestionUseCase: Symbol.for('PreviousQuestionUseCase'),
};

export { TYPES };
