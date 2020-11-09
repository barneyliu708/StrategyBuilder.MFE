import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Strategy } from '../../models/strategy.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {

  constructor(private http: HttpClient) { }

  getAllEventGroups(): Observable<Strategy[]> {
      return this.http.get<Strategy[]>("Strategy");
  }
}
