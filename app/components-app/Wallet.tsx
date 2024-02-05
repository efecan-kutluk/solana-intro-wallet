import { PublicKey } from "@solana/web3.js";
import "./Wallet.css";

type TWalletProps = {
    wallet: {
        pubKey: PublicKey;
        privKey: any;
        balance: number;
    }
}

const Wallet = ({wallet}: TWalletProps = {
    wallet: {pubKey: null, privKey: null, balance: 0}
}) => {

    return (
        <>
            <span> PK: {wallet.pubKey ? wallet.pubKey.toString().slice(0, 4) + "..." : "No Wallet"} </span>
            <span> {wallet.balance} </span>
        </>
    )
}

export default Wallet;