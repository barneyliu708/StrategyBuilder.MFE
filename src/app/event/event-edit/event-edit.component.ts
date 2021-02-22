import { Component, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventGroup } from 'src/app/shared/models/event-group.model';
import { EventOccurance } from 'src/app/shared/models/event.model';

@Component({
  selector: 'event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditDialog {

  eventGroup: EventGroup
  isExpressionEnabled: boolean
  selectedFiles: any

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<EventEditDialog>,
              @Inject(MAT_DIALOG_DATA) 
              public data: any) {
    this.eventGroup = data.eventGroup;
    if (this.eventGroup.expression) {
      this.isExpressionEnabled = true;
    }
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
