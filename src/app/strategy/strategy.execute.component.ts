import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    animal: string;
    name: string;
    strategyName: string;
    strategyDescription: string;
    startFrom: Date;
    startTo: Date;
    symbolList: string[];
  }

@Component({
    selector: 'strategy-execute-dialog',
    templateUrl: './strategy.execute.component.html',
  })
  export class StrategyExecuteDialog implements OnInit {
  
    //symbolList: string[]
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
      public dialogRef: MatDialogRef<StrategyExecuteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    ngOnInit(): void {
      this.data.symbolList = [];
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
  
      // Add our fruit
      if ((value || '').trim()) {
        this.data.symbolList.push(value.trim());
      }
  
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  
    remove(symbol: string): void {
      const index = this.data.symbolList.indexOf(symbol);
  
      if (index >= 0) {
        this.data.symbolList.splice(index, 1);
      }
    }
  }