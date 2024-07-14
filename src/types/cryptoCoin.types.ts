export type TCoinCodes = {
  BTC: "Bitcoin";
  ETH: "Ethereum";
  USDT: "Tether";
  BNB: "BNB";
  SOL: "Solana";
};

export type TCoinNames = TCoinCodes[keyof TCoinCodes];

export type TCoin = {
  name: TCoinNames;
  image: string;
  code: string;
  rate: string;
  cap: string;
  delta: {
    hour: string;
    day: string;
    week: string;
    month: string;
    quarter: string;
    year: string;
  };
};

export type TCoinFromDb = {
  _id: string;
  coinData: TCoin[];
  timeStamp: string;
}[];

const t = [
  {
    name: "Bitcoin",
    symbol: "₿",
    rank: 1,
    age: 5670,
    color: "#fa9e32",
    png32:
      "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/btc.png",
    png64:
      "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/btc.png",
    webp32:
      "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/btc.webp",
    webp64:
      "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/btc.webp",
    exchanges: 190,
    markets: 2797,
    pairs: 850,
    categories: [],
    allTimeHighUSD: 73781.24185982272,
    circulatingSupply: 19720175,
    totalSupply: 19720175,
    maxSupply: 21000000,

    code: "BTC",
    rate: 58040.10347954353,
    volume: 19016981188,
    cap: 1144560997634,
    delta: {
      hour: 1.0035,
      day: 1.0173,
      week: 1.0267,
      month: 0.8572,
      quarter: 0.8991,
      year: 1.8553,
    },
  },
];
