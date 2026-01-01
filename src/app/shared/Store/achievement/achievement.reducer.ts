import { createReducer, on } from '@ngrx/store';
import { AchievementActions, AchievementApiActions } from './achievement.actions';
import { AchievementDTO } from '../../Models/achievement.dto';
import { UserLevelDTO } from '../../Models/user-level.dto';

export interface AchievementState {
  userLevel: UserLevelDTO | null;
  achievements: AchievementDTO[];
  firstLoad: boolean;
  firstLoadError: boolean;
  error: string | null;
}

export const initialState: AchievementState = {
  userLevel: null,
  achievements: [],
  firstLoad: true,
  firstLoadError: false,
  error: null,
};

const _achievementReducer = createReducer(
  initialState,

  on(AchievementActions.loadUserLevel, (state) => ({
    ...state,
    error: null,
  })),

  on(AchievementApiActions.loadUserLevelSuccess, (state, { userLevel }) => ({
    ...state,
    userLevel: userLevel,
    firstLoad: false,
    error: null,
  })),

  on(AchievementApiActions.loadUserLevelFailure, (state, { error }) => ({
    ...state,
    firstLoad: false,
    firstLoadError: true,
    error,
  })),

  on(AchievementActions.loadAchievements, (state) => ({
    ...state,
    error: null,
  })),

  on(AchievementApiActions.loadAchievementsSuccess, (state, { achievements }) => ({
    ...state,
    achievements,
    firstLoad: false,
    error: null,
  })),

  on(AchievementApiActions.loadAchievementsFailure, (state, { error }) => ({
    ...state,
    firstLoad: false,
    firstLoadError: true,
    error,
  })),

  on(AchievementActions.completeAchievement, (state) => ({
    ...state,
    error: null,
  })),

  on(AchievementApiActions.completeAchievementSuccess, (state, { userLevel }) => ({
    ...state,
    userLevel: userLevel,
    error: null,
  })),

  on(AchievementApiActions.completeAchievementFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function achievementReducer(state: any, action: any) {
  return _achievementReducer(state, action);
}
