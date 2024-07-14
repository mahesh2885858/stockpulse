import {
  //   setSelectedCoin,
  getDataForSelectedCoin,
  setShowCoinChangeModal,
} from "@/lib/features/crypto/cryptoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { TCoinCodes, TCoinNames } from "@/types/cryptoCoin.types";
import ModalOverlay from "./ModalOverlay";
function CoinChangeModal() {
  const visible = useAppSelector((state) => state.showCoinChangeModal);
  const selectedCoin = useAppSelector((state) => state.selectedCoin);
  const dispatch = useAppDispatch();
  const options: TCoinCodes = {
    BNB: "BNB",
    BTC: "Bitcoin",
    ETH: "Ethereum",
    SOL: "Solana",
    USDT: "Tether",
  };
  const onChange = (name: TCoinNames) => {
    dispatch(getDataForSelectedCoin(name));
  };
  const closeModal = () => {
    dispatch(setShowCoinChangeModal(false));
  };
  return (
    <ModalOverlay visible={visible}>
      <div className=" bg-[#171b26] w-52 shadow-yellow-300 rounded text-white flex flex-col p-5 gap-4 justify-center items-start">
        <div className="flex flex-col gap-4">
          {Object.keys(options).map((option) => {
            const coin = option as keyof TCoinCodes;
            return (
              <div className="flex gap-2" key={option}>
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="coin"
                  checked={selectedCoin === options[coin]}
                  id={options[coin]}
                  onChange={() => onChange(options[coin])}
                />
                <label className="cursor-pointer" htmlFor={options[coin]}>
                  {options[coin]}
                </label>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-center gap-4">
          <button
            className="bg-blue-500 p-1 px-2 rounded-sm text-white"
            onClick={() => {
              closeModal();
            }}
          >
            close
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

export default CoinChangeModal;
