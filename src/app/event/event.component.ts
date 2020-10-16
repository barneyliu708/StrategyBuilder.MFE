import { Component, OnInit } from '@angular/core';
import { EventGroup } from '../shared/models/event-group.model';
import { EventService } from '../shared/services/event/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventgroupList: EventGroup[];
  
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getAllEventGroups().subscribe((data: EventGroup[]) => this.eventgroupList = data);
  }
}
