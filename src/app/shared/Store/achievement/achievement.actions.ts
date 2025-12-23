import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AchievementDTO } from '../../Models/achievement.dto';
import { UserLevelDTO } from '../../Models/user-level.dto';

export const AchievementActions = createActionGroup({
  source: 'Achievement',
  events: {
    'Load User Level': emptyProps(),
    'Load Achievements': emptyProps(),
    'Complete Achievement': props<{ achievementId: number }>(),
    'Check Automatic Achievements': emptyProps(),
  },
});

export const AchievementApiActions = createActionGroup({
  source: 'Achievement API',
  events: {
    'Load User Level Success': props<{ userLevel: UserLevelDTO }>(),
    'Load User Level Failure': props<{ error: string }>(),
    'Load Achievements Success': props<{ achievements: AchievementDTO[] }>(),
    'Load Achievements Failure': props<{ error: string }>(),
    'Complete Achievement Success': props<{ userLevel: UserLevelDTO }>(),
    'Complete Achievement Failure': props<{ error: string }>(),
    'Check Automatic Achievements Success': props<{ completedAchievements: number[] }>(),
    'Check Automatic Achievements Failure': props<{ error: string }>(),
  },
});
