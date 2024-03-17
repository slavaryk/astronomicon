import { atom } from "nanostores";
import type { TickerShort } from "../../types/Ticker";

export const $tickers = atom<TickerShort[]>([]);
