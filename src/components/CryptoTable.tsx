import { useAppSelector } from "@/lib/hooks";
import formatNumber from "@/utils/formatNumber";
import React from "react";

function CryptoTable() {
  const selectedCoinData = useAppSelector((state) => state.selectedCoinData);

  return (
    <table className=" w-3/4 bg-[#293143] text-white">
      <thead className="">
        <tr>
          <th className="text-left pl-4 p-2 border-b border-b-black">Time</th>
          <th className="text-left pl-4 p-2 border-b border-b-black">
            Price(USD)
          </th>
          <th className="text-left pl-4 p-2 border-b border-b-black">
            Market cap
          </th>
          <th className="text-left pl-4 p-2 border-b border-b-black">1h(%)</th>
          <th className="text-left pl-4 p-2 border-b border-b-black">24h(%)</th>
        </tr>
      </thead>
      <tbody>
        {selectedCoinData.map((item, index) => {
          return (
            <tr key={index}>
              <td className="pl-4 p-2 border-b border-b-black ">
                {item.timeStamp}
              </td>
              <td className="pl-4 p-2 border-b border-b-black ">
                ${item.rate}
              </td>
              <td className="pl-4 p-2 border-b border-b-black ">{item.cap}</td>
              <td
                className={`pl-4 p-2 border-b border-b-black ${
                  item.delta.hour.includes("-")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {item.delta.hour}
              </td>
              <td
                className={`pl-4 p-2 border-b border-b-black ${
                  item.delta.day.includes("-")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {item.delta.day}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CryptoTable;
