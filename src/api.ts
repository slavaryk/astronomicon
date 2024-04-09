import { API_KEY } from "./constants";

export async function getTickerAssets(tickerSym: string) {
	const response = await fetch(
		`https://data-api.cryptocompare.com/asset/v1/data/by/symbol?api_key=${API_KEY}&asset_symbol=${tickerSym.toUpperCase()}`,
	);

	return response.json();
}

export async function getTopSymbols(limit: number = 20) {
	const response = await fetch(
		`https://min-api.cryptocompare.com/data/exchange/top/volume?e=Binance&direction=TO&limit=${limit}`,
	);

	return response.json();
}
