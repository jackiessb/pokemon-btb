import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from 'pokenode-ts';

@Injectable({
  providedIn: 'root'
})
export class PokemonQueryService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) { }

  getPokemonByID(id: number) {
    return this.http.get<Pokemon>("https://localhost:7077/pokemon/getPokemonByID/", {
      headers: this.headers,
      params: this.parameters.append('id', id)
    });
  }
}
