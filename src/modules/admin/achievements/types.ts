const TYPES = {
  AchievementsLocalRepository: Symbol.for("AchievementsLocalRepository"),
  AchievementsHttpRepository: Symbol.for("AchievementsHttpRepository"),
  AchievementsPresenter: Symbol.for("AchievementsPresenter"),
  AchievementsController: Symbol.for("AchievementsController"),
  LoadAchievementsUseCase: Symbol.for("LoadAchievementsUseCase"),
  SelectAchievementUseCase: Symbol.for("SelectAchievementUseCase"),
  CreateAchievementUseCase: Symbol.for("CreateAchievementUseCase"),
  NextAchievementUseCase: Symbol.for("NextAchievementUseCase"),
  PreviousAchievementUseCase: Symbol.for("PreviousAchievementUseCase"),
  ProjectSelectedEventHandler: Symbol.for('IAsyncEventHandler<ProjectSelectedEvent>'),
};

export { TYPES }