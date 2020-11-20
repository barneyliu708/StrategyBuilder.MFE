import {DomSanitizer} from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Strategy } from '../shared/models/strategy.model';
import { StrategyService } from '../shared/services/strategy/strategy.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, StrategyExecuteDialog } from './strategy.execute.component';
import { BackTestingResult } from '../shared/models/backtestingresult.model';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {

  strategyList: Strategy[];
  animal: string;
  name: string;

  constructor(private strategyService: StrategyService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllStrategy();

    this.name = "nanke";
    this.animal = "dogg"
  }
   
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getLastItem(thePath:string) {
    return thePath.substring(thePath.lastIndexOf('/') + 1)
  }

  deleteReport(result: BackTestingResult) {
    this.strategyService.deleteReport(result.id).subscribe(response => {
      console.log("delete successfully");
      this.getAllStrategy();
    })
  }

  openDialog(strategy: Strategy): void {
    console.log(strategy);
    const dialogRef = this.dialog.open(StrategyExecuteDialog, {
      width: '60%',
      data: {
        name: this.name, 
        animal: this.animal,
        strategyName: strategy.name,
        strategyDescription: strategy.description
      }
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      
      // this.animal = result;
      console.log('The dialog was closed ');
      console.log(result);
      this.strategyService.executeStrategy(result.startFrom, result.startTo, result.symbol, strategy.id).subscribe(response => {
        console.log(response);
        this.getAllStrategy();
      });
    });
  }

  getAllStrategy() {
    this.strategyService.getAllStrategies().subscribe((data: Strategy[]) => {
      this.strategyList = data; 
      console.log(this.strategyList);
    } );
  }
}
