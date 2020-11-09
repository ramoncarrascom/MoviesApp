import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  private formatDate(date: Date): string {

    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2)  {
      day = '0' + day;
    }

    return [year, month, day].join('-');

  }

  private ejecutarQuery<T>(query: string) {

    query = URL + query;
    query += `&api_key=${API_KEY}&language=es&include_image_language=es`;
    
    return this.httpClient.get<T>(query);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0);
    const primerDia = new Date( hoy.getFullYear(), hoy.getMonth(), 1);

    const query = `/discover/movie?primary_release_date.gte=${this.formatDate(primerDia)}&primary_release_date.lte=${this.formatDate(ultimoDia)}`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPopular(page: number) {
    const query = `/discover/movie?sort_by=popularity.desc&page=${page}`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }
}
