import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SimulationParameter{
  numberOfSimulations: number;
  changeDoor: boolean;
}

interface SimulationResult {
  numberOfWinsWithoutChanging: number;
  numberOfWinsWithChanging: number;
}

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private apiUrl = 'http://localhost:5070/simulation';
  constructor(private http: HttpClient) { }

  simulateGame(params: SimulationParameter): Observable<SimulationResult>{
    console.log(this.apiUrl);
    return this.http.post<SimulationResult>(this.apiUrl, params);
  }
}
