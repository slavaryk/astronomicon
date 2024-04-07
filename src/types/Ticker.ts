export type Ticker = {
	id: number;
	symbol: TickerSymbol;
	title: string;
	logoUrl: string;
	description: string;
	websiteUrl: string;
	priceInUSD: number;
	createdOn: Date | 0;
	launchDate: Date | 0;
	priceInUSDUpdatedOn: Date | 0;
	fullDescription: string;
}

export type TickerShort = {
	symbol: TickerSymbol;
	price: number | null;
}

export type TickerAssetDTO = {
	id: number;
	symbol: TickerSymbol;
	title: string;
	logoUrl: string;
	description: string;
	websiteUrl: string;
	createdOn: Date | 0;
	launchDate: Date | 0;
	priceInUSD: number;
	priceInUSDUpdatedOn: Date | 0;
	fullDescription: string;
}

export type NewTickerPriceDTO = {
	type: string;
	symbol: TickerSymbol;
	newPrice: number | null;
}

export type TickerSymbol = string;

export type TickerPriceResponse = {
	TYPE?: string;
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
		CREATED_ON?: number;
		LAUNCH_DATE?: number;
		PRICE_USD?: number;
		PRICE_USD_LAST_UPDATE_TS?: number;
		ASSET_DESCRIPTION?: string;
	};
}
