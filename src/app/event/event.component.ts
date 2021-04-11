import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventGroup } from '../shared/models/event-group.model';
import { Indicator } from '../shared/models/indicator.model';
import { EventService } from '../shared/services/event/event.service';
import { IndicatorService } from '../shared/services/indicator/indicator.service';
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
  indicatorList: Indicator[];
  
  constructor(private eventService: EventService,
              public indicatorService: IndicatorService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.eventService.getAllEventGroups().subscribe((data: EventGroup[]) => {
      this.eventgroupList = data;
    });
    this.indicatorService.getAllIndicators().subscribe((data: Indicator[]) => this.indicatorList = data);
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
        eventGroup: eventGroup,
        indicatorList: this.indicatorList
      }
    });

    dialogRef.afterClosed().subscribe((updatedEventGroupd: EventGroup) => {
      console.log('The edit event dialog was closed ');
      console.log(updatedEventGroupd);

      if (updatedEventGroupd) {
        this.eventService.updateEventGroup(updatedEventGroupd).subscribe(response => {
          console.log(response);
        });
        this.eventService.updateEventsForEventGroup(updatedEventGroupd.id.toString(), updatedEventGroupd.events).subscribe(response => {
          console.log(response);
        });
      }

      this.ngOnInit();
    });
  }
}
