import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventGroup } from '../shared/models/event-group.model';
import { EventService } from '../shared/services/event/event.service';
import { DialogData } from '../strategy/strategy.execute.component';
import { EventEditDialog } from './event-edit/event-edit.component';
import { EventNewDialog } from './event-new/event-new.component';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventgroupList: EventGroup[];
  
  constructor(private eventService: EventService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.eventService.getAllEventGroups().subscribe((data: EventGroup[]) => this.eventgroupList = data);
  }

  openNewDialog(): void {
    const dialogRef = this.dialog.open(EventNewDialog, {
      width: '60%',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      console.log('The new event dialog was closed ');
      console.log(result);

      // this.eventService.updateEventsForEventGroup()
    });
  }

  openEditDialog(eventGroup: EventGroup): void {
    const dialogRef = this.dialog.open(EventEditDialog, {
      width: '60%',
      data: {
        eventGroup: eventGroup
      }
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      console.log('The edit event dialog was closed ');
      console.log(result);

      // this.eventService.updateEventsForEventGroup()
    });
  }
}
