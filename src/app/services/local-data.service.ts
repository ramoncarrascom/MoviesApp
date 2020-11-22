import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) { }

  guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = this.peliculas.some(peli => peli.id === pelicula.id);
    let mensaje = '';

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Película eliminada de Favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Película añadida a Favoritos';
    }

    this.storage.set('peliculas', this.peliculas);

    this.presentToast(mensaje);

  }

  async presentToast(mensaje: string) {

    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500,
      position: 'top',
      color: 'success'
    });

    toast.present();
  }

  async cargarFavoritos() {

    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;

  }

  async existePelicula(id) {

    await this.cargarFavoritos();
    return this.peliculas.some(peli => peli.id === id);

  }

}
