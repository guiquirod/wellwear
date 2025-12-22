import { AchievementSection } from '../Enum/achievemnent-section';

export interface AchievementDTO {
  id: number;
  title: string;
  type: AchievementSection;
  points: number;
  completed: boolean;
  completedAt: string | null;
}