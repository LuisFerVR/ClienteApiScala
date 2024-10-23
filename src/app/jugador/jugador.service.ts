import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jugador } from '../shared/models/jugador.model';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private apiUrl = 'http://localhost:9000/jugadores';

  constructor(private http: HttpClient) {}

  getJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.apiUrl);
  }

  getJugador(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.apiUrl}/${id}`);
  }

  createJugador(jugador: Jugador): Observable<any> {
    return this.http.post(this.apiUrl, jugador);
  }

  updateJugador(id: number, jugador: Jugador): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, jugador);
  }

  deleteJugador(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}