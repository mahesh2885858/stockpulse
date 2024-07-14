"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { AppStore, makeStore } from "../lib/store";
import LoadingIndicator from "../components/LoadingIndicator";
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

  let persistor = persistStore(makeStore());

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
