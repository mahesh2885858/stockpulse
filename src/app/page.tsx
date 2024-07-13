"use client";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const formatDate = (time: string) => {
    const date = new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    });
    return date.format(new Date(time));
  };

  useEffect(() => {
    const getData = async () => {
      const d = await fetch("/api/crypto");
      const r = await d.json();
      console.log({ r });
    };
    getData();
  });

  const t = useAppSelector((state) => state.value);
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
        {t.map((item, index) => {
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
