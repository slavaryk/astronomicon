import type {
	NewTickerPriceDTO as _NewTickerPriceDTO,
	TickerPriceResponse,
	TickerAssetDTO as _TickerAssetDTO,
	TickerAssetResponse,
} from "./types/Ticker";

export function NewTickerPriceDTO(data: TickerPriceResponse): _NewTickerPriceDTO {
	return {
		symbol: data?.FROMSYMBOL ?? "",
		newPrice: data?.PRICE ?? null,
	};
}

export function TickerAssetDTO(data: TickerAssetResponse): _TickerAssetDTO {
	return {
		id: data.Data.ID,
		symbol: data?.Data.SYMBOL ?? "",
		title: data?.Data.NAME ?? "[unknown]",
		logoUrl: data?.Data.LOGO_URL ?? "",
		description: data?.Data.ASSET_DESCRIPTION_SNIPPET ?? "",
		websiteUrl: data?.Data.WEBSITE_URL ?? "",
		createdOn: data?.Data.CREATED_ON ? new Date(data.Data.CREATED_ON) : 0,
		launchDate: data?.Data.LAUNCH_DATE ? new Date(data.Data.LAUNCH_DATE) : 0,
		priceInUSD: data?.Data.PRICE_USD ?? 0,
		priceInUSDUpdatedOn: data?.Data.PRICE_USD_LAST_UPDATE_TS ? new Date (data?.Data.PRICE_USD_LAST_UPDATE_TS) : 0,
		fullDescription: data?.Data.ASSET_DESCRIPTION ?? "",
	};
}
