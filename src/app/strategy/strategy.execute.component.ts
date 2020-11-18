import { Component, Inject, OnInit } from '@angular/core';
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
  export class StrategyExecuteDialog {
  
    constructor(
      public dialogRef: MatDialogRef<StrategyExecuteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }