import { EventGroup } from './event-group.model';

export class StrategyEventGroup {
    eventGroupId: number
    strategyId: number
    eventGroup: EventGroup
    afterDays: number
    percentage: number
    action: string
}