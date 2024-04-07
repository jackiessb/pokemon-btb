import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from 'pokenode-ts';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
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

  getPokemonByQuery(query: string) {
    return this.http.get<Array<Pokemon>>("https://localhost:7077/pokemon/getPokemonByQuery/", {
      headers: this.headers,
      params: this.parameters.append('query', query)
    });
  }

  setupForQuery() {
    return this.http.get<boolean>("https://localhost:7077/pokemon/setupForQuery/", {
      headers: this.headers
    });
  }
}
