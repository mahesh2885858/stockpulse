import { TCryptoItem } from "@/lib/features/crypto/cryptoSlice";
import { TCoinFromDb, TCoinNames } from "@/types/cryptoCoin.types";

export const convertDataToRender = (
  selectedCoin: TCoinNames,
  data: TCoinFromDb
): TCryptoItem[] => {
  const requiredArray: TCryptoItem[] = [];
  data.forEach((coin, index) => {
    const t = coin.coinData.filter((item) => item.name === selectedCoin)[0];
    requiredArray.push({ ...t, timeStamp: coin.timeStamp });
  });
  return requiredArray;
};
