import { TCoin } from "@/types/cryptoCoin.types";

const mapApiDataToDbData = (data: any): TCoin[] => {
  return data.map((coin: any) => {
    return {
      name: coin.name,
      code: coin.code,
      rate: coin.rate.toString(),
      cap: coin.cap.toString(),
      image: coin.png64,
      delta: {
        hour: coin.delta.hour.toString(),
        day: coin.delta.day.toString(),
        week: coin.delta.week.toString(),
        month: coin.delta.month.toString(),
        quarter: coin.delta.quarter.toString(),
        year: coin.delta.year.toString(),
      },
    };
  });
};

export default mapApiDataToDbData;
