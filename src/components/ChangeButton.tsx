import { setShowCoinChangeModal } from "@/lib/features/crypto/cryptoSlice";
import { useAppDispatch } from "@/lib/hooks";
import React from "react";

function ChangeButton() {
  const dispatch = useAppDispatch();

  return (
    <button
      className="px-2 py-2 rounded bg-blue-500 text-white hover:bg-blue-400/50"
      onClick={() => {
        dispatch(setShowCoinChangeModal(true));
      }}
    >
      Select another coin
    </button>
  );
}

export default ChangeButton;
