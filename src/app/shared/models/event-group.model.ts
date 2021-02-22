import { EventOccurance } from './event.model';

export class EventGroup {
    id: number;
    name: string;
    description: string;
    expression: string;
    events: EventOccurance[]
}