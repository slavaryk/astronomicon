import { ref } from "vue";
import { formatDate } from "../utils/formatDate";

import type { Ticker } from "../types/Ticker";

export type TitleTuple = [title: string, value: string, isLink: boolean];

type TickerEntry = [keyof Ticker, string | number | Date];

function resolveTitle(entry: TickerEntry): TitleTuple | undefined {
	switch (entry[0]) {
	case "symbol": return ["Symbol", `${entry[1]}`, false];
	case "websiteUrl": return ["URL to token page", `${entry[1]}`, true];
	case "createdOn": return ["Created on", `${formatDate(["d", "M", "y"], new Date(entry[1]))}`, false];
	case "launchDate": return ["Launch date", `${formatDate(["d", "M", "y"], new Date(entry[1]))}`, false];
	case "priceInUSD": return ["Price (USD)", `${entry[1]}`, false];
	case "priceInUSDUpdatedOn": return ["Price (USD) updated on", `${formatDate(["d", "M", "y"], new Date(entry[1]))}`, false];
	default: return undefined;
	}
}

export const useTickerInfoTitles = (tickerInfo: Ticker) => {
	const titles = ref<TitleTuple[]>(Object.entries(tickerInfo ?? {}).reduce((acc, entry: TickerEntry) => {
		const titleTuple = resolveTitle(entry);

		if (!titleTuple) return acc;
		acc.push(titleTuple);

		return acc;
	}, [] as TitleTuple[]));

	return { titles };
};
