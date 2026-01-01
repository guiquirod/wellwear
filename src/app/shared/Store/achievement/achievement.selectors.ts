import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AchievementState } from './achievement.reducer';
import { AchievementSection } from '../../Enum/achievemnent-section';

export const selectAchievementState = createFeatureSelector<AchievementState>('achievement');

export const selectUserLevel = createSelector(
  selectAchievementState,
  (state: AchievementState) => state?.userLevel
);

export const selectAllAchievements = createSelector(
  selectAchievementState,
  (state: AchievementState) => state?.achievements || []
);

export const selectDailyAchievements = createSelector(selectAllAchievements, (achievements) =>
  achievements.filter((achievement) => achievement.type === AchievementSection.Daily)
);

export const selectWeeklyAchievements = createSelector(selectAllAchievements, (achievements) =>
  achievements.filter((achievement) => achievement.type === AchievementSection.Weekly)
);

export const selectMonthlyAchievements = createSelector(selectAllAchievements, (achievements) =>
  achievements.filter((achievement) => achievement.type === AchievementSection.Monthly)
);

export const selectAutomaticAchievements = createSelector(selectAllAchievements, (achievements) =>
  achievements.filter((achievement) => achievement.type === AchievementSection.Automatic)
);

export const selectAchievementsLoading = createSelector(
  selectAchievementState,
  (state: AchievementState) => state.firstLoad
);

export const selectAchievementsError = createSelector(
  selectAchievementState,
  (state: AchievementState) => state.firstLoadError
);
