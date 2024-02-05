import { Keypair } from "@solana/web3.js";
import "./TransferBox.css";
import { AsyncButton } from "./common/Button";

type TBProps = {
  transactionHandler: Function,
  from: any
}

const TransferBox = ({transactionHandler, from}: TBProps) => {
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.amount)
    await transactionHandler(from, e.target.to, e.target.amount)
  }
  return (
    <div className={"card"}>
      <form>
      <label>
        <span>Transfer</span>
        <input type="text" placeholder="0.00 SOL" name="amount"/>
      </label>
      <label>
        <span>To:</span>
        <input type="text" placeholder="Eg: 0xCa123b..." name="to"/>
      </label>
      <button type="submit" onClick={submitHandler}>
        Send
      </button>
      </form>

    </div>
  )
}

export default TransferBox;
