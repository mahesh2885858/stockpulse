import {
  getNewData,
  resetTimer,
  getDataForSelectedCoin,
  countTime,
} from "@/lib/features/crypto/cryptoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "axios";
import React, { useEffect, useRef } from "react";

function Timer() {
  const selectedCoin = useAppSelector((state) => state.selectedCoin);
  const value = useAppSelector((state) => state.dataForAllCoins);
  const timer = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();
  let timeRef = useRef<any>();

  useEffect(() => {
    if (timer !== 1) return;

    const getData = async () => {
      const response = await axios("/api/crypto");
      const data = response.data;
      dispatch(getNewData(data.data));
      dispatch(resetTimer());
    };

    if (timer === 1) {
      clearInterval(timeRef.current);
      getData();
    }
  }, [timer]);

  useEffect(() => {
    dispatch(getDataForSelectedCoin(selectedCoin));

    timeRef.current = setInterval(() => {
      dispatch(countTime());
    }, 1000);

    return () => {
      clearInterval(timeRef.current);
    };
  }, [value]);

  return <p>Next update in {timer} sec</p>;
}

export default Timer;
