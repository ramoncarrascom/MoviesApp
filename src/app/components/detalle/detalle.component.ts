import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle;
  actores: Cast[] = [];
  existe: boolean = false;

  oculto = 150;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true
  };

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private localData: LocalDataService) { }

  async ngOnInit() {

    this.existe = await this.localData.existePelicula(this.id);

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe( resp => {
        this.pelicula = resp;
      });

    this.moviesService.getPeliculaActores(this.id)
    .subscribe( resp => {
      this.actores = resp.cast;
    });

  }

  regresar() {

    this.modalCtrl.dismiss();

  }

  async favorito() {

    await this.localData.guardarPelicula(this.pelicula);
    this.existe = await this.localData.existePelicula(this.id);

  }

}
