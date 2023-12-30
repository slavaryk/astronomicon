import { ref } from "vue";

import type { Ticker } from "../types/Ticker";

export type TitleTuple = [keyof Ticker, string, boolean];

function isPropertyLink(key: keyof Ticker): boolean {
	switch (key) {
	case "websiteUrl":
		return true;
	default: return false;
	}
}

function resolveTitle(key: keyof Ticker) {
	switch (key) {
	case "symbol": return "Symbol";
	case "websiteUrl": return "URL to token page";
	case "createdOn": return "Created on";
	case "launchDate": return "Launch date";
	case "priceInUSD": return "Price (USD)";
	case "priceInUSDUpdatedOn": return "Price (USD) updated on";
	default: return "";
	}
}

export const useTickerInfoTitles = (tickerInfo: Ticker) => {
	const titles = ref<TitleTuple[]>(Object.keys(tickerInfo).reduce((acc, key: keyof Ticker) => {
		const title = resolveTitle(key);

		if (!title) return acc;
		acc.push([key, title, isPropertyLink(key)]);

		return acc;
	}, [] as TitleTuple[]));

	return { titles };
};
