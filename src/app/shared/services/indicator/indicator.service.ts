import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Indicator } from '../../models/indicator.model';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  constructor(private http: HttpClient) { }

  getAllIndicators(): Observable<Indicator[]>{
    return this.http.get<Indicator[]>("Indicator");
  }
}
