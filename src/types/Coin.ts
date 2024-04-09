import type { TickerSymbol } from "./Ticker.ts";

export type CoinResponse = {
	toSymbol: string;
	fromSymbol: string;
	volume: string;
}

export type CoinListResponse = {
	Data: CoinResponse[];
}

export type CoinListDTO = TickerSymbol[];
