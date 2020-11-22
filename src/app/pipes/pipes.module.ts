import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltrarGeneroPipe } from './filtrar-genero.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    FiltrarGeneroPipe
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    FiltrarGeneroPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
