import axios from "axios";
const API_URL = "https://api.livecoinwatch.com/coins/list";
export const getTheDataFromApi = async () => {
  try {
    const data = {
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: 5,
      meta: true,
    };
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "e6347cd2-e7ea-4ff2-bbc2-75d240bf7497",
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.log({ error });
    return { success: false, error };
  }
};
