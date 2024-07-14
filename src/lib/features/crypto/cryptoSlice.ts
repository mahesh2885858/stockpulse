import { TCoin, TCoinFromDb, TCoinNames } from "@/types/cryptoCoin.types";
import { convertDataToRender } from "@/utils/convertCoinDataToRender";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCryptoItem = TCoin & { timeStamp: string };

export type TCryptoState = {
  value: TCoinFromDb;
  selectedCoinData: TCryptoItem[];
  selectedCoin: TCoinNames;
  showCoinChangeModal: boolean;
};

const initialState: TCryptoState = {
  value: [],
  selectedCoinData: [],
  selectedCoin: "Bitcoin",
  showCoinChangeModal: false,
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    getNewData: (state, action: PayloadAction<any[]>) => {
      state.value = action.payload;
    },
    setShowCoinChangeModal: (state, action: PayloadAction<boolean>) => {
      state.showCoinChangeModal = action.payload;
    },

    getDataForSelectedCoin: (state, action: PayloadAction<TCoinNames>) => {
      const coin = action.payload ? action.payload : state.selectedCoin;
      const data = convertDataToRender(coin, state.value);
      state.selectedCoinData = data;
      state.selectedCoin = coin;
    },
  },
});

export const {
  getNewData,
  setShowCoinChangeModal,
  // setSelectedCoin,
  getDataForSelectedCoin,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
