"use client";
import ChangeButton from "@/components/ChangeButton";
import CoinChangeModal from "@/components/CoinChangeModal";
import CryptoTable from "@/components/CryptoTable";
import Timer from "@/components/Timer";
import {
  countTime,
  getDataForSelectedCoin,
  getNewData,
  resetTimer,
} from "@/lib/features/crypto/cryptoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function Home() {
  const selectedCoin = useAppSelector((state) => state.selectedCoin);

  useEffect(() => {
    const startPolling = async () => {
      await axios.post("/api/polling");
    };
    startPolling();
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-2  p-12 bg-[#171b26]">
        <CoinChangeModal />
        <div className="flex w-3/4 justify-between text-white">
          <p>Most recent data on {selectedCoin}</p>
          <Timer />
          <ChangeButton />
        </div>
        <CryptoTable />
      </main>
    </>
  );
}
