import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { EventGroup } from 'src/app/shared/models/event-group.model';
import { EventOccurance } from 'src/app/shared/models/event.model';
import { Indicator } from 'src/app/shared/models/indicator.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EventService } from 'src/app/shared/services/event/event.service';
import { IndicatorService } from 'src/app/shared/services/indicator/indicator.service';

@Component({
  selector: 'event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditDialog {

  eventGroup: EventGroup;
  indicatorList: Indicator[];
  filteredIndicators: Observable<Indicator[]>;
  selectedIndicators: Indicator[];
  isExpressionEnabled: boolean;
  selectedFiles: any;
  stock: any;
  dateFrom: Date;
  dateTo: Date;

  indicatorCtrl = new FormControl();
  @ViewChild('indicatorInput') indicatorInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<EventEditDialog>,
              @Inject(MAT_DIALOG_DATA) 
              public data: any,
              public indicatorService: IndicatorService) {
    this.eventGroup = data.eventGroup;
    this.indicatorList = data.indicatorList;
    this.selectedIndicators = [];
    // this.filteredIndicators = this.indicatorCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => fruit ? this._filter(fruit) : this.indicatorList.slice()));
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

  onSelecteIndicator(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.selectedIndicators.push(event.option.value);
    this.eventGroup.expression = this.indicatorService.convertIndicatorsToExpression(this.selectedIndicators);
    
    this.indicatorInput.nativeElement.value = '';
    this.indicatorCtrl.setValue(null);
  }

  onClearIndicators() {
    this.selectedIndicators = [];
    this.eventGroup.expression = undefined;
  }

  onClearEvents() {
    this.eventGroup.events = [];
  }

  onAddIndicator(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    console.log(event);

    // Add our fruit
    if ((value || '').trim()) {
      let newIndicator = new Indicator();
      newIndicator.text = value.trim();
      if(!isNaN(+value.trim())) {
        newIndicator.key = '{Number:' + value.trim() + '}';
      } else {
        newIndicator.key = '{Symbol:' + value.trim() + '}';
      }
      
      console.log('add successfully');
      this.selectedIndicators.push(newIndicator);
      this.eventGroup.expression = this.indicatorService.convertIndicatorsToExpression(this.selectedIndicators);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.indicatorInput.nativeElement.value = '';
    this.indicatorCtrl.setValue(null);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onExecuteExpression() {
    this.indicatorService.executeExpression(this.dateFrom, this.dateTo, this.eventGroup.expression).subscribe(response => {
      this.eventGroup.events = response;
    })
  }

  private _filter(value: string): Indicator[] {

    if (!value) {
      return this.indicatorList;
    }

    const filterValue = value.toLowerCase();

    return this.indicatorList.filter(ind => ind.text.toLowerCase().indexOf(filterValue) === 0);
  }
}
