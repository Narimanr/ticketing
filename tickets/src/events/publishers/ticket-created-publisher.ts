import { Publisher, Subjects, TicketCreatedEvent } from '@nrtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}