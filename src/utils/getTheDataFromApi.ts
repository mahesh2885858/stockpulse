import { TCoinCodes } from "@/types/cryptoCoin.types";
import axios from "axios";

const API_URL = "https://api.livecoinwatch.com/coins/map";

const coinCodes: (keyof TCoinCodes)[] = ["BTC", "BNB", "ETH", "SOL", "USDT"];

export const getTheDataFromApi = async () => {
  try {
    const data = {
      codes: coinCodes,
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      meta: true,
      limit: 0,
    };

    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.log({ error });
    return { success: false, error };
  }
};
