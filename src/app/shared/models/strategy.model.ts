import { BackTestingResult } from './backtestingresult.model';
import { StrategyEventGroup } from './strategy-eventgroup.model';

export class Strategy {
    id: number;
    name: string;
    description: string;
    joinStrategyEventGroups: StrategyEventGroup[];
    backTestingResults: BackTestingResult[];
}