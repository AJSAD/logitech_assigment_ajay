import { get, has } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useSubscribeQuery } from "../services/websocketApi";
import { RootState } from "../store/store";

export const useBookSubscribeQuery = ( prec: string) => { 
    const uniqueId = crypto.randomUUID();

    return useMemo(() => (JSON.stringify({
        id: uniqueId,
        channel: "book",
        event: "subscribe",
        freq: "F0",
        len: "100",
        prec: prec,
        subId: `book/tBTCUSD/${prec}`,
        symbol: "tBTCUSD",
    })), [prec]);
}

export const useUnSubscribeQuery = ( key: string) => {
    const channels = useSelector((state: RootState) => state.channels);

    return useMemo(() => {
        const chanId = get(channels, [key, "chanId"], null);
        return chanId
            ? JSON.stringify({ chanId, event: "unsubscribe" })
            : null;
    }, [channels, key]);
}

export const BookSubscriber = () => {
  const { precision } = useSelector((state: RootState) => state.orderBookSettings);
  const channels = useSelector((state: RootState) => state.channels);
  const subscribeMsg = useBookSubscribeQuery(precision);
  const unsubscribeMsg = useUnSubscribeQuery("book");
  const [msg, setMsg ] = useState(subscribeMsg); 

  useEffect(() => {
    setMsg(unsubscribeMsg);
  }, [precision]);

   useEffect(() => {
    if(!has(channels, "book")) {
      setMsg(subscribeMsg);
    }
  }, [channels]);

  useSubscribeQuery(msg);

  return null;
};