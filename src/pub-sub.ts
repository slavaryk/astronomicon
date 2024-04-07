import { addSubscriptionTo, postMessageTo } from "./transmitter";
import { MessageParty } from "./enum/MessageParty";
import { NewTickerPriceDTO } from "./dto";

import type {
	TickerShort,
	NewTickerPriceDTO as _NewTickerPriceDTO,
	TickerSymbol,
	TickerPriceResponse,
} from "./types/Ticker";

const subscribers = new Map<TickerSymbol, ((newTickerPrice: _NewTickerPriceDTO) => void)[]>();

addSubscriptionTo(MessageParty.WEB_SOCKET, receiveUpdateTickerMessage);

export function receiveUpdateTickerMessage(price: TickerPriceResponse) {
	const dto = NewTickerPriceDTO(price);
	if (subscribers.has(dto.symbol)) notifySubscribers(dto);
}

function notifySubscribers(newTickerPrice: _NewTickerPriceDTO) {
	for (const callback of subscribers.get(newTickerPrice.symbol)!) {
		callback(newTickerPrice);
	}
}

export function subscribeToUpdatesOf(
	ticker: TickerShort,
	callback: (newTickerPriceDTO: _NewTickerPriceDTO) => void,
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

function postSubscribeToTickerMessage(tickerSym: TickerSymbol) {
	const subscribeToTickerData = {
		action: "SubAdd",
		subs: [`5~CCCAGG~${tickerSym}~USD`],
	};

	postMessageTo(MessageParty.WEB_SOCKET, subscribeToTickerData);
}
