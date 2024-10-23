// services/torneo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Torneo } from '../shared/models/torneo.model';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  private apiUrl = 'http://localhost:9000/torneos';

  constructor(private http: HttpClient) {}

  getTorneos(): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(this.apiUrl);
  }

  getTorneo(id: number): Observable<Torneo> {
    return this.http.get<Torneo>(`${this.apiUrl}/${id}`);
  }

  createTorneo(torneo: Torneo): Observable<any> {
    return this.http.post(this.apiUrl, torneo);
  }

  updateTorneo(id: number, torneo: Torneo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, torneo);
  }

  deleteTorneo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}