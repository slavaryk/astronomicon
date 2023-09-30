import { addSubscriptionTo, postMessageTo } from "./transmitter";
import { MessageParty } from "./enum/MessageParty";
import { TickerDTO as BuildTickerDTO } from "./dto";
import type { Ticker, TickerDTO, TickerSymbol, TickerPriceResponse } from "./types/Ticker";

const subscribers = new Map<TickerSymbol, ((tickerDto: TickerDTO) => void)[]>();

addSubscriptionTo(MessageParty.WEB_SOCKET, receiveUpdateTickerMessage);

export function receiveUpdateTickerMessage(ticker: TickerPriceResponse) {
	const dto = BuildTickerDTO(ticker);
	if (subscribers.has(dto.symbol) && dto.newPrice !== null) notifySubscribers(dto);
}

function notifySubscribers(tickerDTO: TickerDTO) {
	for (const callback of subscribers.get(tickerDTO.symbol)!) {
		callback(tickerDTO);
	}
}

export function subscribeToUpdatesOf(
	ticker: Ticker,
	callback: (tickerDTO: TickerDTO) => void,
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
