import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Club } from '../../shared/models/club.model';
import { Jugador } from '../../shared/models/jugador.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  getEquipos(): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.apiUrl}/equipos`);
  }

  getEquipo(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/equipos/${id}`);
  }

  createEquipo(equipo: Club): Observable<any> {
    return this.http.post(`${this.apiUrl}/equipos`, equipo);
  }

  updateEquipo(id: number, equipo: Club): Observable<any> {
    return this.http.put(`${this.apiUrl}/equipos/${id}`, equipo);
  }

  deleteEquipo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/equipos/${id}`);
  }

  // Método para obtener jugadores
  getJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.apiUrl}/jugadores`);
  }

  // Método para obtener jugadores por equipo
  getJugadoresPorEquipo(equipoId: number): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.apiUrl}/jugadores?equipo_id=${equipoId}`);
  }
}