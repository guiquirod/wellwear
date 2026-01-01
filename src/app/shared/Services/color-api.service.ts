import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { diff, rgb_to_lab } from 'color-diff';
import { GarmentDTO } from '../Models/garment.dto';
import { GarmentSection } from '../Enum/garment-type';

interface ColorSchemeResponse {
  colors: { hex: { clean: string } }[];
}

@Injectable({
  providedIn: 'root',
})
export class ColorApiService {
  private readonly apiUrl = 'https://www.thecolorapi.com';

  constructor(private http: HttpClient) {}

  private cleanHex(hex: string): string {
    return hex.replace('#', '');
  }

  private hexToRgb(hex: string): { R: number; G: number; B: number } | null {
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.cleanHex(hex));
    return result
      ? {
          R: parseInt(result[1], 16),
          G: parseInt(result[2], 16),
          B: parseInt(result[3], 16),
        }
      : null;
  }

  private calculateColorDistance(hex1: string, hex2: string): number {
    const rgb1 = this.hexToRgb(hex1);
    const rgb2 = this.hexToRgb(hex2);
    if (!rgb1 || !rgb2) return Infinity;
    return diff(rgb_to_lab(rgb1), rgb_to_lab(rgb2));
  }

  private getColorScheme(hex: string): Observable<string[]> {
    return this.http
      .get<ColorSchemeResponse>(
        `${this.apiUrl}/scheme?hex=${this.cleanHex(hex)}&mode=analogic-complement&count=5`
      )
      .pipe(map((response) => response.colors.map((color) => color.hex.clean.toLowerCase())));
  }

  private getGarmentDistanceToScheme(garmentColor: string, schemeColors: string[]): number {
    let minDistance = Infinity;

    for (const schemeColor of schemeColors) {
      const mainDistance = this.calculateColorDistance(garmentColor, schemeColor);
      minDistance = Math.min(minDistance, mainDistance);
    }

    return minDistance;
  }

  private hasMatchingSeason(garment: GarmentDTO, seasons: string[]): boolean {
    return garment.seasons.some((season) => seasons.includes(season));
  }

  recommendComplementaryGarment(
    selectedGarment: GarmentDTO,
    allGarments: GarmentDTO[],
    targetSection: GarmentSection
  ): Observable<string | null> {
    const garmentsPool = allGarments.filter(
      (garment) =>
        garment.supType === targetSection &&
        this.hasMatchingSeason(garment, selectedGarment.seasons) &&
        (selectedGarment.pattern ? !garment.pattern : true)
    );

    if (garmentsPool.length === 0) {
      return of(null);
    }

    return this.getColorScheme(selectedGarment.mainColor).pipe(
      map((schemeColors) => {
        const avgWorn = garmentsPool.reduce((sum, g) => sum + g.worn, 0) / garmentsPool.length;
        let bestGarment = garmentsPool[0];
        let bestScore = Infinity;

        for (const garment of garmentsPool) {
          const colorDistance = this.getGarmentDistanceToScheme(garment.mainColor, schemeColors);
          const overlyWorn = garment.worn > avgWorn ? garment.worn - avgWorn : 0;
          const finalScore = colorDistance + overlyWorn;

          if (finalScore < bestScore) {
            bestScore = finalScore;
            bestGarment = garment;
          }
        }

        return bestGarment.id;
      }),
      catchError(() => of(null))
    );
  }
}
