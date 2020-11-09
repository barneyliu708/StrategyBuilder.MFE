import { Component, OnInit } from '@angular/core';
import { Strategy } from '../shared/models/strategy.model';
import { StrategyService } from '../shared/services/strategy/strategy.service';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {

  strategyList: Strategy[];
  constructor(private strategyService: StrategyService) { }

  ngOnInit(): void {
    this.strategyService.getAllEventGroups().subscribe((data: Strategy[]) => {this.strategyList = data; console.log(this.strategyList);} );
    
  }

}
