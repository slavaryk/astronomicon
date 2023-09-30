export type Ticker = {
	title: string;
	symbol: TickerSymbol;
	priceInUSD: number;
}

export type TickerDTO = {
	symbol: TickerSymbol;
	newPrice: number | null;
}

export type TickerSymbol = string;

export type TickerResponse = {
	FROMSYMBOL?: string;
	PRICE?: number;
}
