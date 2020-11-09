import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  popularesPage: number = 1;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {

    this.moviesService
      .getFeature()
      .subscribe(resp => {
        this.peliculasRecientes = resp.results;
      });

    this.getPopulares();

  }

  cargarMas() {

    this.popularesPage++;
    this.getPopulares();

  }

  getPopulares() {

    this.moviesService
      .getPopular(this.popularesPage)
      .subscribe(resp => {
        const pelisTemp = [...this.populares, ...resp.results];
        this.populares = pelisTemp;
      });

  }

}
