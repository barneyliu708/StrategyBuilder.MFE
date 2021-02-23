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
    symbol: string;
  }

@Component({
    selector: 'strategy-execute-dialog',
    templateUrl: './strategy.execute.component.html',
  })
  export class StrategyExecuteDialog implements OnInit {
  
    symbolList: string[]
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
      public dialogRef: MatDialogRef<StrategyExecuteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    ngOnInit(): void {
      this.symbolList = [];
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
  
      // Add our fruit
      if ((value || '').trim()) {
        this.symbolList.push(value.trim());
      }
  
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  
    remove(symbol: string): void {
      const index = this.symbolList.indexOf(symbol);
  
      if (index >= 0) {
        this.symbolList.splice(index, 1);
      }
    }
  }