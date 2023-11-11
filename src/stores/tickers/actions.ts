import { action } from "nanostores";
import { $tickers } from ".";
import type { Dispatcher } from "../../types/Dispatcher";
import type { Ticker, NewTickerPriceDTO } from "../../types/Ticker";

export enum TickersActions {
	AddNewTicker = "AddNewTicker",
	UpdateTickerPrice = "UpdateTickerPrice",
}

export const TickersDispatcher: Dispatcher<TickersActions> = {
	dispatch(action: TickersActions, ...args: unknown[]) {
		this[action](...args);
	},

	[TickersActions.AddNewTicker]: action(
		$tickers,
		TickersActions.AddNewTicker,
		(store, newTicker: Ticker) => {
			store.set([...store.get(), newTicker]);
		},
	),

	[TickersActions.UpdateTickerPrice]: action(
		$tickers,
		TickersActions.UpdateTickerPrice,
		(store, ticker: Ticker, newPriceDto: NewTickerPriceDTO) => {
			const tickers = store.get();
			const tickerIndex = tickers.findIndex(_ => _.id === ticker.id);

			tickers[tickerIndex].priceInUSD = newPriceDto.newPrice;

			store.set([...tickers]);
		},
	),
};
