import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Strategy } from '../../models/strategy.model';
import { Observable } from 'rxjs';
import { EventGroup } from '../../models/event-group.model';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {

  constructor(private http: HttpClient) { }

  getAllStrategies(): Observable<Strategy[]> {
      return this.http.get<Strategy[]>("Strategy/1");
  }

  executeStrategy(datefrom: Date, dateto: Date, symbol: string, strategyId: number): Observable<any> {
    const params = new HttpParams()
    .set('from', datefrom.toDateString())
    .set('to', dateto.toDateString())
    .set('symbol', symbol)
    .set('strategyId', strategyId.toString());
    return this.http.get<any>("BackTesting/Execute", { params });
  }

  deleteReport(reportId: number): Observable<any> {
    let httpParams = new HttpParams().set('resultID', reportId.toString());
    let options = { params: httpParams };
    return this.http.delete("BackTesting", options);
  }

  updateEventGroupsInStrategy(strategyId: number, newEventGroupIds: number[]): Observable<any>{
    // const params = new HttpParams()
    //                 .set('strategyId', strategyId.toString());

    return this.http.put(`Strategy/${strategyId}/eventgroups`, newEventGroupIds)
  }
}
