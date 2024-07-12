import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCryptoItem = {
  id: string;
  symbol: string;
  name: string;
  price_usd: string;
  timeOfData: string;
  market_cap_usd: string;
};

export type TCryptoState = {
  value: TCryptoItem[];
};

const initialState: TCryptoState = {
  value: [],
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    initializeWithData: (state, action: PayloadAction<TCryptoItem[]>) => {
      state.value = action.payload;
    },
  },
});

export const { initializeWithData } = cryptoSlice.actions;

export default cryptoSlice.reducer;
