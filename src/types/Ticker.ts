export type Ticker = {
	id: number;
	symbol: TickerSymbol;
	title: string;
	logoUrl: string;
	description: string;
	websiteUrl: string;
	priceInUSD: number;
}

export type NewTickerPriceDTO = {
	symbol: TickerSymbol;
	newPrice: number | null;
}

export type TickerAssetDTO = {
	id: number;
	symbol: TickerSymbol;
	title: string;
	logoUrl: string;
	description: string;
	websiteUrl: string;
}

export type TickerSymbol = string;

export type TickerPriceResponse = {
	FROMSYMBOL?: string;
	PRICE?: number;
}

export type TickerAssetResponse = {
	Data: {
		ID: number;
		SYMBOL?: string;
		NAME?: string;
		LOGO_URL: string;
		ASSET_DESCRIPTION_SNIPPET?: string;
		WEBSITE_URL?: string;
	};
}
