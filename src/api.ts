import { API_KEY } from "./constants";

export async function getTickerAssets(tickerSym: string) {
	const response = await fetch(
		`https://data-api.cryptocompare.com/asset/v1/data/by/symbol?api_key=${API_KEY}&asset_symbol=${tickerSym.toUpperCase()}`,
	);

	return response.json();
}
