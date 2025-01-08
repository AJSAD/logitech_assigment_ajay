import { useMemo } from "react";

export const useBookSubscribeQuery = ( prec: string) =>
    useMemo(() => (JSON.stringify({
        channel: "book",
        event: "subscribe",
        freq: "F0",
        len: "100",
        prec: prec,
        subId: `book/tBTCUSD/${prec}`,
        symbol: "tBTCUSD",
    })), [prec]);