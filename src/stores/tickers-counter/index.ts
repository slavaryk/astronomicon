import { computed } from "nanostores";
import { $tickers } from "../tickers";

export const $tickersCounter = computed($tickers, tickers => tickers.length - 1);
