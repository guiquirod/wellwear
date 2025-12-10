import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { AuthDTO } from '../Models/auth.dto';
import { UserDTO } from '../Models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlWellwearApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'wellwear-api';
    this.urlWellwearApi = 'http://localhost/' + this.controller;
  }

  login(credentials: AuthDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(`${this.urlWellwearApi}/login.php`, credentials, { withCredentials: true })
      .pipe(catchError((error) => this.sharedService.handleError(error)));
  }

  register(credentials: AuthDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(`${this.urlWellwearApi}/register.php`, credentials, { withCredentials: true })
      .pipe(catchError((error) => this.sharedService.handleError(error)));
  }

  checkSessionState(): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(`${this.urlWellwearApi}/check-session.php`, { withCredentials: true })
      .pipe(catchError((error) => this.sharedService.handleError(error)));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.urlWellwearApi}/logout.php`, {}, { withCredentials: true })
      .pipe(catchError((error) => this.sharedService.handleError(error)));
  }
}
