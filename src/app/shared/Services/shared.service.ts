import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';

export interface ResponseError {
  statusCode: number;
  message: string;
  messageDetail: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  toast$ = new Subject<{ message: string; success: boolean }>();

  constructor() {}

  showToast(message: string, success: boolean = false): void {
    this.toast$.next({ message, success });
  }

  errorLog(error: ResponseError): void {
    console.error('message:', error.message);
    console.error('messageDetail:', error.messageDetail);
    console.error('statusCode:', error.statusCode);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
