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

export type TickerPriceResponse = {
	FROMSYMBOL?: string;
	PRICE?: number;
}

export type TickerAssetResponse = {
	NAME?: string;
	LOGO_URL: string;
	ASSET_DESCRIPTION_SUMMARY?: string;
	WEBSITE_URL?: string;
}
