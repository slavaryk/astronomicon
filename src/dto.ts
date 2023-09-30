import type { TickerDTO as _TickerDTO, TickerPriceResponse } from "./types/Ticker";

export function TickerDTO(data: TickerPriceResponse): _TickerDTO {
	return {
		symbol: data?.FROMSYMBOL ?? "",
		newPrice: data?.PRICE ?? null,
	};
}
