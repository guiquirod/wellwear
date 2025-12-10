import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { GarmentDTO } from '../Models/garment.dto';
import { ApiResponse } from '../Models/api-response.dto';

@Injectable({
  providedIn: 'root'
})
export class GarmentService {
  private urlWellwearApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'wellwear-api';
    this.urlWellwearApi = 'http://localhost/' + this.controller;
  }

  createGarment(garment: Omit<GarmentDTO, 'id' | 'picture'>, imageFile: File): Observable<ApiResponse<GarmentDTO>> {
    const formData = new FormData();
    formData.append('type', garment.type.toString());
    formData.append('supType', garment.supType.toString());
    formData.append('fabricType', JSON.stringify(garment.fabricType));
    formData.append('mainColor', garment.mainColor);
    formData.append('sleeve', garment.sleeve.toString());
    formData.append('seasons', JSON.stringify(garment.seasons));
    formData.append('pattern', garment.pattern.toString());
    formData.append('isSecondHand', garment.isSecondHand.toString());
    formData.append('picture', imageFile, imageFile.name);

    return this.http
      .post<ApiResponse<GarmentDTO>>(`${this.urlWellwearApi}/create-garment.php`, formData, { withCredentials: true })
      .pipe(catchError(this.sharedService.handleError));
  }

  getGarments(): Observable<GarmentDTO[]> {
    return this.http
      .get<GarmentDTO[]>(`${this.urlWellwearApi}/get-garments.php`, { withCredentials: true })
      .pipe(catchError(this.sharedService.handleError));
  }

  getGarmentById(id: string): Observable<GarmentDTO> {
    return this.http
      .get<GarmentDTO>(`${this.urlWellwearApi}/get-garment.php?id=${id}`, { withCredentials: true })
      .pipe(catchError(this.sharedService.handleError));
  }

  updateGarment(id: string, garment: Partial<GarmentDTO>, imageFile?: File): Observable<ApiResponse<GarmentDTO>> {
    const formData = new FormData();

    if (garment.type) {
      formData.append('type', garment.type.toString());
    }
    if (garment.supType) {
      formData.append('supType', garment.supType.toString());
    }
    if (garment.fabricType) {
      formData.append('fabricType', JSON.stringify(garment.fabricType));
    }
    if (garment.mainColor) {
      formData.append('mainColor', garment.mainColor);
    }
    if (garment.sleeve) {
      formData.append('sleeve', garment.sleeve.toString());
    }
    if (garment.seasons) {
      formData.append('seasons', JSON.stringify(garment.seasons));
    }
    if (garment.pattern !== undefined) {
      formData.append('pattern', garment.pattern.toString());
    }
    if (garment.isSecondHand !== undefined) {
      formData.append('isSecondHand', garment.isSecondHand.toString());
    }
    if (imageFile) {
      formData.append('picture', imageFile, imageFile.name);
    }

    return this.http
      .post<ApiResponse<GarmentDTO>>(`${this.urlWellwearApi}/update-garment.php?id=${id}`, formData, { withCredentials: true })
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteGarment(id: string): Observable<ApiResponse> {
    return this.http
      .delete<ApiResponse>(`${this.urlWellwearApi}/delete-garment.php`, {
        body: { garmentId: id },
        withCredentials: true
      })
      .pipe(catchError(this.sharedService.handleError));
  }
}
