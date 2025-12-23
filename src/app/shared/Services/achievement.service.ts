import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { AchievementDTO } from '../Models/achievement.dto';
import { ApiResponse } from '../Models/api-response.dto';
import { UserLevelDTO } from '../Models/user-level.dto';

@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  private urlWellwearApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'wellwear-api';
    this.urlWellwearApi = 'http://localhost/' + this.controller;
  }

  getUserLevel(): Observable<ApiResponse<UserLevelDTO>> {
    return this.http
      .get<ApiResponse<UserLevelDTO>>(`${this.urlWellwearApi}/get-user-level.php`, {
        withCredentials: true,
      })
      .pipe(catchError(this.sharedService.handleError));
  }

  getAchievements(): Observable<ApiResponse<AchievementDTO[]>> {
    return this.http
      .get<ApiResponse<AchievementDTO[]>>(`${this.urlWellwearApi}/get-achievements.php`, {
        withCredentials: true,
      })
      .pipe(catchError(this.sharedService.handleError));
  }

  completeAchievement(achievementId: number): Observable<ApiResponse<UserLevelDTO>> {
    return this.http
      .post<ApiResponse<UserLevelDTO>>(
        `${this.urlWellwearApi}/complete-achievement.php`,
        { achievementId },
        { withCredentials: true }
      )
      .pipe(catchError(this.sharedService.handleError));
  }

  checkAutomaticAchievements(): Observable<ApiResponse<{ completedAchievements: number[] }>> {
    return this.http
      .post<ApiResponse<{ completedAchievements: number[] }>>(
        `${this.urlWellwearApi}/check-automatic-achievements.php`,
        {},
        { withCredentials: true }
      )
      .pipe(catchError(this.sharedService.handleError));
  }
}
