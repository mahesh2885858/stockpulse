import { TCoin, TCoinFromDb, TCoinNames } from "@/types/cryptoCoin.types";
import { convertDataToRender } from "@/utils/convertCoinDataToRender";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCryptoItem = TCoin & { timeStamp: string };

export type TCryptoState = {
  dataForAllCoins: TCoinFromDb;
  selectedCoinData: TCryptoItem[];
  selectedCoin: TCoinNames;
  showCoinChangeModal: boolean;
  timer: number;
};

const initialState: TCryptoState = {
  dataForAllCoins: [],
  selectedCoinData: [],
  selectedCoin: "Bitcoin",
  showCoinChangeModal: false,
  timer: 59,
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    getNewData: (state, action: PayloadAction<any[]>) => {
      state.dataForAllCoins = action.payload;
    },

    setShowCoinChangeModal: (state, action: PayloadAction<boolean>) => {
      state.showCoinChangeModal = action.payload;
    },

    getDataForSelectedCoin: (state, action: PayloadAction<TCoinNames>) => {
      const coin = action.payload ? action.payload : state.selectedCoin;
      const data = convertDataToRender(coin, state.dataForAllCoins);
      state.selectedCoinData = data;
      state.selectedCoin = coin;
    },

    countTime: (state) => {
      const t = state.timer;
      if (state.timer === 0 || state.timer < 0) {
        state.timer = 60;
        return;
      }
      state.timer = t - 1;
    },

    resetTimer: (state) => {
      state.timer = 59;
    },
  },
});

export const {
  getNewData,
  setShowCoinChangeModal,
  getDataForSelectedCoin,
  countTime,
  resetTimer,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
