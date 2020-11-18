import { BackTestingResult } from './backtestingresult.model';
import { EventGroup } from './event-group.model';

export class Strategy {
    id: number;
    name: string;
    description: string;
    eventGroups: EventGroup[];
    backTestingResults: BackTestingResult[];
}