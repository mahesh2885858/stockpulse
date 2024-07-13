import { TCoin } from "@/types/cryptoCoin.types";

const mapApiDataToDbData = (data: any): TCoin[] => {
  return data.map((coin: any) => {
    return {
      name: coin.name,
      symbol: coin.symbol,
      code: coin.code,
      rate: coin.rate,
      cap: coin.cap,
      delta: {
        hour: coin.delta.hour,
        day: coin.delta.day,
        week: coin.delta.week,
        month: coin.delta.month,
        quarter: coin.delta.quarter,
        year: coin.delta.year,
      },
    };
  });
};

export default mapApiDataToDbData;
