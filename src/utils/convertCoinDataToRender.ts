import { TCryptoItem } from "@/lib/features/crypto/cryptoSlice";
import { TCoinFromDb, TCoinNames } from "@/types/cryptoCoin.types";
import formatNumber from "./formatNumber";

const formatDate = (time: string) => {
  const date = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  });
  return date.format(new Date(time));
};
function calculatePercentageChange(deltaValue: string) {
  const rate = parseFloat(deltaValue) - 1;
  const t = (parseFloat(rate.toFixed(5)) * 100).toFixed(3);
  return t;
}
export const convertDataToRender = (
  selectedCoin: TCoinNames,
  data: TCoinFromDb
): TCryptoItem[] => {
  const requiredArray: TCryptoItem[] = [];
  data.forEach((coin, index) => {
    const t = coin.coinData.filter((item) => item.name === selectedCoin)[0];
    requiredArray.push({
      ...t,
      timeStamp: formatDate(coin.timeStamp),
      cap: formatNumber(parseFloat(t.cap)),
      rate: formatNumber(parseFloat(t.rate)),
      delta: {
        ...t.delta,
        day: calculatePercentageChange(t.delta.day),
        hour: calculatePercentageChange(t.delta.hour),
      },
    });
  });
  return requiredArray;
};
