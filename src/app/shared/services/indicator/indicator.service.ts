import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventOccurance } from '../../models/event.model';
import { Indicator } from '../../models/indicator.model';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  constructor(private http: HttpClient) { }

  getAllIndicators(): Observable<Indicator[]>{
    return this.http.get<Indicator[]>("Indicator");
  }

  convertIndicatorsToExpression(indicators: Indicator[]): string {
    let array = [];
    indicators.forEach(indicator => {
      array.push(indicator.key);
    })

    return array.join(';');
  }

  getExpressionForDisplay(expression: string, indicators: Indicator[]): string {

    if (!expression || !indicators){
      return;
    }

    let expArr = expression.split(';');
    let resultArry = [];
    expArr.forEach(exp => {
      let idx = indicators.filter(i => i.key === exp)[0];
      let value = exp.match(/{([a-zA-Z]*):([a-zA-Z0-9.]*)}/)[2];
      let type = exp.match(/{([a-zA-Z]*):([a-zA-Z0-9.]*)}/)[1];
      if (type === "Comparator") {
        value = idx.text
      }
      resultArry.push(value);
    })
    return resultArry.join(' ');
  }

  executeExpression(datefrom: Date, dateto: Date, expression: string): Observable<EventOccurance[]> {
    let body = {
      from: datefrom.toDateString(),
      to: dateto.toDateString(),
      expression: expression
    }
    return this.http.post<EventOccurance[]>("Indicator/ExecuteExpression", body);
  }
}
