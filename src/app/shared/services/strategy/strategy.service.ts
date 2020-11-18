import { HttpClient, HttpParams } from '@angular/common/http';
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

  executeStrategy(datefrom: Date, dateto: Date, symbol: string, strategyId: number): Observable<any> {
    const params = new HttpParams()
    .set('from', datefrom.toDateString())
    .set('to', dateto.toDateString())
    .set('symbol', symbol)
    .set('strategyId', strategyId.toString());
    return this.http.get<any>("BackTesting/Execute", { params });
  }
}
