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
	};
}
