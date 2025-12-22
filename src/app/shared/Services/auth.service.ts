import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { AuthDTO } from '../Models/auth.dto';
import { UserDTO } from '../Models/user.dto';
import { ApiResponse } from '../Models/api-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlWellwearApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'wellwear-api';
    this.urlWellwearApi = 'http://localhost/' + this.controller;
  }

  login(credentials: AuthDTO): Observable<ApiResponse<UserDTO>> {
    return this.http
      .post<ApiResponse<UserDTO>>(`${this.urlWellwearApi}/login.php`, credentials, {
        withCredentials: true,
      })
      .pipe(catchError((error) => this.sharedService.handleError(error)));
  }

  register(credentials: AuthDTO): Observable<ApiResponse<UserDTO>> {
    return this.http
      .post<ApiResponse<UserDTO>>(`${this.urlWellwearApi}/register.php`, credentials, {
        withCredentials: true,
      })
      .pipe(catchError((error) => this.sharedService.handleError(error)));
  }

  checkSessionState(): Observable<ApiResponse<UserDTO>> {
    return this.http
      .get<ApiResponse<UserDTO>>(`${this.urlWellwearApi}/check-session.php`, {
        withCredentials: true,
      })
      .pipe(catchError((error) => this.sharedService.handleError(error)));
  }

  logout(): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.urlWellwearApi}/logout.php`, {}, { withCredentials: true })
      .pipe(catchError((error) => this.sharedService.handleError(error)));
  }

  deleteUser(): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.urlWellwearApi}/delete-user.php`, {}, { withCredentials: true })
      .pipe(catchError((error) => this.sharedService.handleError(error)));
  }
}
