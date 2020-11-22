import { Pipe, PipeTransform } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';

@Pipe({
  name: 'FiltrarGenero'
})

export class FiltrarGeneroPipe implements PipeTransform {

  transform(value: PeliculaDetalle[], genero: Genre): PeliculaDetalle[] {

    const resp = value.filter(x => x.genres.some(y => y.id === genero.id));

    if (resp.length > 0) {
      return resp;
    } else {
      return undefined;
    }

  }

}
