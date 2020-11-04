import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): unknown {

    if (!img) {
      return environment.noImage;
    }

    const imgUrl = `${environment.imgPath}/${size}${img}`;
    console.log('imgUrl', imgUrl);

    return imgUrl;

  }

}
