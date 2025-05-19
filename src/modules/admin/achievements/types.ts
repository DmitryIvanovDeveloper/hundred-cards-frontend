const TYPES = {
  AchievementsLocalRepository: Symbol.for("AchievementsLocalRepository"),
  AchievementsHttpRepository: Symbol.for("AchievementsHttpRepository"),
  AchievementsPresenter: Symbol.for("AchievementsPresenter"),
  AchievementsController: Symbol.for("AchievementsController"),
  LoadAchievementsUseCase: Symbol.for("LoadAchievementsUseCase"),
  SelectAchievementUseCase: Symbol.for("SelectAchievementUseCase"),
  CreateAchievementUseCase: Symbol.for("CreateAchievementUseCase"),
  DeleteAchievementUseCase: Symbol.for("DeleteAchievementUseCase"),
  DeleteAchievementLocalUseCase: Symbol.for("DeleteAchievementLocalUseCase"),
  NextAchievementUseCase: Symbol.for("NextAchievementUseCase"),
  PreviousAchievementUseCase: Symbol.for("PreviousAchievementUseCase"),
  ProjectSelectedEventHandler: Symbol.for('IAsyncEventHandler<ProjectSelectedEvent>'),
  QuestionsLoadedEventHandler: Symbol.for('ISyncEventHandler<QuestionsLoadedEvent>'),
  LevelsLoadedEventHandler: Symbol.for('ISyncEventHandler<LevelsLoadedEvent>'),
};

export { TYPES }