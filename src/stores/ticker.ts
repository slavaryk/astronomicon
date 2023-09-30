import { map } from "nanostores";
import type { Ticker } from "../types/Ticker";

export const $ticker = map<Ticker>({
	title: "",
	symbol: "",
	priceInUSD: 0,
});
