import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventGroup } from '../shared/models/event-group.model';
import { StrategyEventGroup } from '../shared/models/strategy-eventgroup.model';
import { Strategy } from '../shared/models/strategy.model';
import { StrategyService } from '../shared/services/strategy/strategy.service';



@Component({
    selector: 'strategy-edit-dialog',
    templateUrl: './strategy.edit.component.html',
  })
  export class StrategyEditDialog {
  
    strategy: Strategy;
    eventGroupList: EventGroup[];

    constructor(public dialogRef: MatDialogRef<StrategyEditDialog>,
                @Inject(MAT_DIALOG_DATA) 
                public data: any,
                private strategyService: StrategyService) {
      this.strategy = data.strategy;
      this.eventGroupList = data.allEventGroups;

      // this.strategy.joinStrategyEventGroups.forEach(r => {
      //   r.action = 'buy'
      // })
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

    eventGroupSelected(valueSelected: EventGroup) {
      const itemToAddIndex = this.strategy.joinStrategyEventGroups.findIndex(function(item) {
        return item.eventGroup.id === valueSelected.id;
      });
      if(itemToAddIndex === -1){
        let newrelationship = new StrategyEventGroup();
        newrelationship.eventGroup = valueSelected;
        this.strategy.joinStrategyEventGroups.push(newrelationship);
      }
      console.log(valueSelected);
    }

    tradeActionSelected(action: string) {
      console.log("action selected" + action);
    }

    deleteValue(valueDelete: EventGroup) {
      const itemToRemoveIndex = this.strategy.joinStrategyEventGroups.findIndex(function(item) {
        return item.eventGroup.id === valueDelete.id;
      });
      if(itemToRemoveIndex !== -1){
        this.strategy.joinStrategyEventGroups.splice(itemToRemoveIndex, 1);
      }
      console.log(valueDelete);
    }
  }