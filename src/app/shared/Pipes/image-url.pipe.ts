import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  transform(path: string): string {
    return path?.startsWith('http') ? path : `http://localhost/wellwear-api/${path}`;
  }
}
