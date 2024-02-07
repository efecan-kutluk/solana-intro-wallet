import { Keypair } from "@solana/web3.js";
import "./TransferBox.css";

type TBProps = {
  transactionHandler: Function,
  from: Keypair
}

const TransferBox = ({ transactionHandler, from }: TBProps) => {
  const submitHandler = async (data: FormData) => {
    const sign = await transactionHandler(from, data.get("to"), data.get("amount"))
    alert(sign)
  }
  return (
    <div className={"card"}>
      <form action={submitHandler}>
        <label>
          <span>Transfer</span>
          <input type="text" placeholder="0.00 SOL" name="amount" />
        </label>
        <label>
          <span>To:</span>
          <input type="text" placeholder="Eg: 0xCa123b..." name="to" />
        </label>
        <button type="submit">
          Send
        </button>
      </form>

    </div>
  )
}

export default TransferBox;
