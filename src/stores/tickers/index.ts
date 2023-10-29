import { atom } from "nanostores";
import type { Ticker } from "../../types/Ticker";

export const $tickers = atom<Ticker[]>([]);
