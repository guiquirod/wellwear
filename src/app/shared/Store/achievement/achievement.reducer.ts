import { createReducer, on } from '@ngrx/store';
import { AchievementActions, AchievementApiActions } from './achievement.actions';
import { AchievementDTO } from '../../Models/achievement.dto';
import { UserLevelDTO } from '../../Models/user-level.dto';

export interface AchievementState {
  userLevel: UserLevelDTO | null;
  achievements: AchievementDTO[];
  loading: boolean;
  error: string | null;
}

export const initialState: AchievementState = {
  userLevel: null,
  achievements: [],
  loading: false,
  error: null,
};

const _achievementReducer = createReducer(
  initialState,

  on(AchievementActions.loadUserLevel, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AchievementApiActions.loadUserLevelSuccess, (state, { userAchievement }) => ({
    ...state,
    userLevel: userAchievement,
    loading: false,
    error: null,
  })),

  on(AchievementApiActions.loadUserLevelFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AchievementActions.loadAchievements, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AchievementApiActions.loadAchievementsSuccess, (state, { achievements }) => ({
    ...state,
    achievements,
    loading: false,
    error: null,
  })),

  on(AchievementApiActions.loadAchievementsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AchievementActions.completeAchievement, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AchievementApiActions.completeAchievementSuccess, (state, { userAchievement }) => ({
    ...state,
    userLevel: userAchievement,
    loading: false,
    error: null,
  })),

  on(AchievementApiActions.completeAchievementFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function achievementReducer(state: any, action: any) {
  return _achievementReducer(state, action);
}
