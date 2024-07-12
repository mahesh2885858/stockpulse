"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import {
  initializeWithData,
  TCryptoItem,
} from "@/lib/features/crypto/cryptoSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  const t: TCryptoItem = {
    id: "90",
    symbol: "BTC",
    name: "Bitcoin",
    price_usd: "57138.68",
    timeOfData: new Date().toString(),
    market_cap_usd: "1126851002141.70",
  };
  const d = [t, t, t];
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeWithData(d));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
