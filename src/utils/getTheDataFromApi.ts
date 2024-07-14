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
        "x-api-key": process.env.API_KEY,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.log({ error });
    return { success: false, error };
  }
};
