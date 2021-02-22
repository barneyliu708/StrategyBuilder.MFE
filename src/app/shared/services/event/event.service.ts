import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventGroup } from '../../models/event-group.model';
import { map } from 'rxjs/operators';
import { EventOccurance } from '../../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAllEventGroups(): Observable<EventGroup[]> {
      return this.http.get<EventGroup[]>("EventGroup/1");
  }

  updateEventsForEventGroup(eventgoupid: string, eventList: EventOccurance[]): Observable<any> {
    let datetimeList = eventList.map(e => e.occurrence);
    return this.http.put(`EventGroup/${eventgoupid}/events`, datetimeList);
  }
}
