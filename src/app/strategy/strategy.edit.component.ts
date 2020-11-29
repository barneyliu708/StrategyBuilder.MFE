import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventGroup } from '../shared/models/event-group.model';
import { Strategy } from '../shared/models/strategy.model';
import { StrategyService } from '../shared/services/strategy/strategy.service';



@Component({
    selector: 'strategy-edit-dialog',
    templateUrl: './strategy.edit.component.html',
  })
  export class StrategyEditDialog {
  
    strategy: Strategy;
    eventGroupList: EventGroup[];

    constructor(
      public dialogRef: MatDialogRef<StrategyEditDialog>,
      @Inject(MAT_DIALOG_DATA) 
      public data: any,
      private strategyService: StrategyService) {
        this.strategy = data.strategy;
        this.eventGroupList = data.allEventGroups;
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    // onOkClick(): void {
    //   // this.strategyService.updateEventGroupsInStrategy(this.strategy.id, this.strategy.eventGroups.map(a => a.id)).subscribe(response => {
    //   //   this.dialogRef.close();
    //   // })
    //   this.dialogRef.close();
    // }

    valueSelected(valueSelected: EventGroup) {
      const itemToAddIndex = this.strategy.eventGroups.findIndex(function(item) {
        return item.id === valueSelected.id;
      });
      if(itemToAddIndex === -1){
        this.strategy.eventGroups.push(valueSelected);
      }
      console.log(valueSelected);
    }

    deleteValue(valueDelete: EventGroup) {
      const itemToRemoveIndex = this.strategy.eventGroups.findIndex(function(item) {
        return item.id === valueDelete.id;
      });
      if(itemToRemoveIndex !== -1){
        this.strategy.eventGroups.splice(itemToRemoveIndex, 1);
      }
      console.log(valueDelete);
    }
  }