import { Listener, OrderCreatedEvent, Subjects } from "@nrtickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // create a job
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('Waiting this many ms to process a job', delay);
        await expirationQueue.add({
            orderId: data.id
        },
        {
            delay
            }
        );

        msg.ack();
    };
}