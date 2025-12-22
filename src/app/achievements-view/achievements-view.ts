import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SectionTitle } from '../shared/Components/section-title/section-title';
import { AchievementRow } from '../shared/Components/achievement-row/achievement-row';
import { UserLevelDTO } from '../shared/Models/user-level.dto';
import { AchievementDTO } from '../shared/Models/achievement.dto';
import { GenericToast } from '../shared/Components/generic-toast/generic-toast';
import { AchievementActions } from '../shared/Store/achievement/achievement.actions';
import {
  selectDailyAchievements,
  selectWeeklyAchievements,
  selectMonthlyAchievements,
  selectAutomaticAchievements,
  selectUserLevel,
} from '../shared/Store/achievement/achievement.selectors';

@Component({
  selector: 'app-achievements-view',
  imports: [CommonModule, SectionTitle, AchievementRow, GenericToast],
  templateUrl: './achievements-view.html',
  styleUrl: './achievements-view.scss',
})
export class AchievementsView implements OnInit {
  userLevel$: Observable<UserLevelDTO | null>;
  dailyAchievements$: Observable<AchievementDTO[]>;
  weeklyAchievements$: Observable<AchievementDTO[]>;
  monthlyAchievemenmts$: Observable<AchievementDTO[]>;
  automaticAchievements$: Observable<AchievementDTO[]>;
  userName$: Observable<string | null>;

  constructor(private store: Store<{ auth: { name: string | null } }>) {
    this.userLevel$ = this.store.select(selectUserLevel);
    this.dailyAchievements$ = this.store.select(selectDailyAchievements);
    this.weeklyAchievements$ = this.store.select(selectWeeklyAchievements);
    this.monthlyAchievemenmts$ = this.store.select(selectMonthlyAchievements);
    this.automaticAchievements$ = this.store.select(selectAutomaticAchievements);
    this.userName$ = this.store.select((state) => state.auth.name);
  }

  ngOnInit() {
    this.store.dispatch(AchievementActions.loadUserLevel());
    this.store.dispatch(AchievementActions.loadAchievements());
  }

  onAchievementComplete(achievementId: number) {
    this.store.dispatch(AchievementActions.completeAchievement({ achievementId }));
  }
}
