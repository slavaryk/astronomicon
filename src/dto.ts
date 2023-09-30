import type { TickerDTO as _TickerDTO, TickerResponse } from "./types/Ticker";

export function TickerDTO(data: TickerResponse): _TickerDTO {
	return {
		symbol: data?.FROMSYMBOL ?? "",
		newPrice: data?.PRICE ?? null,
	};
}
