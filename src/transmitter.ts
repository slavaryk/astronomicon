import SharedWorker from "./shared-worker.ts?sharedworker";
import { MessageParty } from "./enum/MessageParty";

import type { Message } from "./types/Message";

type PartySubscriber = (data: unknown) => void;

const sharedWorker = new SharedWorker();
const subscribers = new Map<MessageParty, PartySubscriber[]>();

sharedWorker.port.onmessage = (event: MessageEvent<Message>) => {
	notifySubscribers(event.data);
};

function notifySubscribers(message: Message) {
	if (subscribers.has(message.from)) {
		for (const callback of subscribers.get(message.from)) {
			callback(message.data);
		}
	}
}

export function addSubscriptionTo(party: MessageParty, subscriber: PartySubscriber) {
	if (subscribers.has(party)) {
		const callbacks = subscribers.get(party);
		callbacks.push(subscriber);
	} else {
		subscribers.set(party, [subscriber]);
	}
}

export function postMessageTo(party: MessageParty, data: unknown) {
	const message: Message = {
		to: party,
		data,
	};

	sharedWorker.port.postMessage(message);
}
