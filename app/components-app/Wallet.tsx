import { Keypair } from "@solana/web3.js";
import "./Wallet.css";

type TWalletProps = {
  wallet: {
    pair: Keypair;
    balance: number;
  }
}

const Wallet = ({ wallet }: TWalletProps = {
  wallet: { pair: null, balance: 0 }
}) => {

  return (
    <>
      <span> PK: {wallet.pair && wallet.pair.publicKey ? wallet.pair.publicKey.toString().slice(0, 4) + "..." : "No Wallet"} </span>
      <span> {wallet.balance} </span>
    </>
  )
}

export default Wallet;
