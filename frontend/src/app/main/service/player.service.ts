import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../api/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly baseUrl = environment.baseUrlApi + '/players';

  constructor(private http: HttpClient) { }

  create(data: Player): Observable<Player> {
    return this.http.post<Player>(`${this.baseUrl}`, data);
  }

  update(data: Player, id: number): Observable<Player> {
    return this.http.put<Player>(`${this.baseUrl}/${id}`, data);
  }

  get (id: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/${id}`);
  }

  list (): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}`);
  }

  delete (id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
