"use client";
import CoinChangeModal from "@/components/CoinChangeModal";
import {
  getDataForSelectedCoin,
  getNewData,
  setShowCoinChangeModal,
} from "@/lib/features/crypto/cryptoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const formatDate = (time: string) => {
    const date = new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    });
    return date.format(new Date(time));
  };
  const selectedCoinData = useAppSelector((state) => state.selectedCoinData);
  const selectedCoin = useAppSelector((state) => state.selectedCoin);
  const value = useAppSelector((state) => state.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      const response = await axios("/api/crypto");
      const data = response.data;
      dispatch(getNewData(data.data));
    };
    getData();

    const timer = setInterval(() => {
      getData();
    }, 1000 * 60);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    dispatch(getDataForSelectedCoin(selectedCoin));
  }, [value]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-2  p-12">
        <CoinChangeModal />
        <div className="flex w-3/4 justify-between">
          <p>Most recent data on {selectedCoin}</p>
          <button
            className="px-2 rounded bg-slate-400 hover:bg-slate-400/50"
            onClick={() => {
              console.log("clicked");
              dispatch(setShowCoinChangeModal(true));
            }}
          >
            Select another coin
          </button>
        </div>
        <table className=" w-3/4">
          <thead className="">
            <tr>
              <th className="text-left pl-4 border">Time</th>
              <th className="text-left pl-4 border">Price(USD)</th>
              <th className="text-left pl-4 border">Market cap</th>
            </tr>
          </thead>
          <tbody>
            {selectedCoinData.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="pl-4 border ">{formatDate(item.timeStamp)}</td>
                  <td className="pl-4 border ">{item.rate}</td>
                  <td className="pl-4 border ">{item.cap}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}
