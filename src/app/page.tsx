import Image from "next/image";

export default function Home() {
  const t = {
    id: "90",
    symbol: "BTC",
    name: "Bitcoin",
    nameid: "bitcoin",
    rank: 1,
    price_usd: "57138.68",
    timeOfData: new Date(),
    market_cap_usd: "1126851002141.70",
  };
  
  const formatDate = (time: Date) => {
    const date = new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    });
    return date.format(time);
  };

  const c = [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t];
  return (
    <main className="flex min-h-screen flex-col items-center gap-2  p-12">
      <div className="flex w-3/4 justify-between">
        <p>Most recent data on Bitcoin</p>
        <button>selected another coin</button>
      </div>
      <table className=" w-3/4">
        <tr className="">
          <th className="text-left pl-4 border">Time</th>
          <th className="text-left pl-4 border">Price(USD)</th>
          <th className="text-left pl-4 border">Market cap</th>
        </tr>
        {c.map((item, index) => {
          return (
            <tr key={index}>
              <td className="pl-4 border ">{formatDate(item.timeOfData)}</td>
              <td className="pl-4 border ">{item.price_usd}</td>
              <td className="pl-4 border ">{item.market_cap_usd}</td>
            </tr>
          );
        })}
      </table>
    </main>
  );
}
