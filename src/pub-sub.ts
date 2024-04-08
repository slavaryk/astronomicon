import { addSubscriptionTo, postMessageTo } from "./transmitter";
import { MessageParty } from "./enum/MessageParty";

import type {
	TickerShort,
	TickerSymbol,
} from "./types/Ticker";

const subscribers = new Map<TickerSymbol, ((data: any) => void)[]>();

addSubscriptionTo(MessageParty.WEB_SOCKET, receiveUpdateTickerMessage);

export function receiveUpdateTickerMessage(data: any) {
	if (subscribers.has(data?.FROMSYMBOL)) notifySubscribers(data);
}

function notifySubscribers(data: any) {
	for (const callback of subscribers.get(data?.FROMSYMBOL)!) {
		callback(data);
	}
}

export function subscribeToUpdatesOf(
	ticker: TickerShort,
	callback: (data: any) => void,
)
{
	const tickerSymbol = ticker.symbol;

	if (subscribers.has(tickerSymbol)) {
		const callbacks = subscribers.get(tickerSymbol);
		callbacks?.push(callback);
	} else {
		subscribers.set(tickerSymbol, [callback]);
		postSubscribeToTickerMessage(tickerSymbol);
	}
}

export function unsubscribeFromUpdatesOf(
	ticker: TickerShort,
)
{
	const tickerSymbol = ticker.symbol;

	if (subscribers.has(tickerSymbol)) {
		subscribers.delete(tickerSymbol);
	}
}

function postSubscribeToTickerMessage(tickerSym: TickerSymbol) {
	const subscribeToTickerData = {
		action: "SubAdd",
		subs: [`5~CCCAGG~${tickerSym}~USD`],
	};

	postMessageTo(MessageParty.WEB_SOCKET, subscribeToTickerData);
}
