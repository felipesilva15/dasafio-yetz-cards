import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../api/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly baseUrl = environment.baseUrlApi + '/teams';

  constructor(private http: HttpClient) { }

  get (id: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${id}`);
  }

  list (): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}`);
  }

  delete (id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
