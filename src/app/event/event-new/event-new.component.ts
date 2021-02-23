import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventGroup } from 'src/app/shared/models/event-group.model';
import { EventOccurance } from 'src/app/shared/models/event.model';

@Component({
  selector: 'event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewDialog {

  eventGroup: EventGroup
  eventlist: Date[]
  isExpressionEnabled: boolean
  selectedFiles: any
  stock: any

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<EventNewDialog>,
              @Inject(MAT_DIALOG_DATA) 
              public data: any) { 
    this.eventGroup = new EventGroup();
    this.eventGroup.events = [];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEventDateChange(event: MatDatepickerInputEvent<Date>): void {
    console.log(event.value);
    let newEvent = new EventOccurance();
    newEvent.occurrence = event.value;
    this.eventGroup.events.push(newEvent);
    this.eventGroup.events.sort((a, b) => {
      return +a.occurrence - +b.occurrence;
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
