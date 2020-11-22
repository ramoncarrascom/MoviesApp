import { Component, OnInit } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { LocalDataService } from '../services/local-data.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  constructor(private localDataService: LocalDataService,
              private moviesService: MoviesService) {}

  async ngOnInit() {

    this.generos = await this.moviesService.getGeneros();

  }

  async ionViewWillEnter() {

    this.peliculas = await this.localDataService.cargarFavoritos();

  }

  async refresh() {

    this.peliculas = await this.localDataService.cargarFavoritos();

  }

}
