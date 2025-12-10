import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AchievementDTO } from '../../Models/achievement.dto';
import { UserLevelDTO } from '../../Models/user-level.dto';

export const AchievementActions = createActionGroup({
  source: 'Achievement',
  events: {
    'Load User Level': emptyProps(),
    'Load Achievements': emptyProps(),
    'Complete Achievement': props<{ achievementId: number }>(),
  },
});

export const AchievementApiActions = createActionGroup({
  source: 'Achievement API',
  events: {
    'Load User Level Success': props<{ userAchievement: UserLevelDTO }>(),
    'Load User Level Failure': props<{ error: string }>(),
    'Load Achievements Success': props<{ achievements: AchievementDTO[] }>(),
    'Load Achievements Failure': props<{ error: string }>(),
    'Complete Achievement Success': props<{ userAchievement: UserLevelDTO }>(),
    'Complete Achievement Failure': props<{ error: string }>(),
  },
});
