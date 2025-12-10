import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { OutfitDTO } from '../Models/outfit.dto';
import { OutfitWithGarments } from '../Models/outfit-with-garments.dto';
import { ApiResponse } from '../Models/api-response.dto';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  private urlWellwearApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'wellwear-api';
    this.urlWellwearApi = 'http://localhost/' + this.controller;
  }

  createOutfit(garmentIds: string[]): Observable<ApiResponse<OutfitDTO>> {
    return this.http
      .post<ApiResponse<OutfitDTO>>(`${this.urlWellwearApi}/create-outfit.php`, { garmentIds }, { withCredentials: true })
      .pipe(catchError(this.sharedService.handleError));
  }

  getOutfits(date?: string): Observable<ApiResponse<OutfitWithGarments[]>> {
    const url = date
      ? `${this.urlWellwearApi}/get-outfits.php?date=${date}`
      : `${this.urlWellwearApi}/get-outfits.php`;
    return this.http
      .get<ApiResponse<OutfitWithGarments[]>>(url, { withCredentials: true })
      .pipe(catchError(this.sharedService.handleError));
  }

  updateOutfit(id: string, garmentIds: string[]): Observable<ApiResponse<OutfitDTO>> {
    return this.http
      .put<ApiResponse<OutfitDTO>>(`${this.urlWellwearApi}/update-outfit.php`, {
        outfitId: id,
        garmentId: garmentIds
      }, { withCredentials: true })
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteOutfit(id: string): Observable<ApiResponse> {
    return this.http
      .delete<ApiResponse>(`${this.urlWellwearApi}/delete-outfit.php`, {
        body: { outfitId: id },
        withCredentials: true
      })
      .pipe(catchError(this.sharedService.handleError));
  }

  wearOutfit(id: string, date?: string): Observable<ApiResponse> {
    const wornDate = date ?? new Date().toISOString().split('T')[0];
    return this.http
      .post<ApiResponse>(`${this.urlWellwearApi}/wear-outfit.php`, { outfitId: id, wornDate }, { withCredentials: true });
  }

  unwearOutfit(id: string, date: string): Observable<ApiResponse> {
    return this.http
      .delete<ApiResponse>(`${this.urlWellwearApi}/wear-outfit.php`, {
        body: { outfitId: id, wornDate: date },
        withCredentials: true
      });
  }
}
