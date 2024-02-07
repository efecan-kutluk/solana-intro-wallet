"use client"
import { useState, useEffect } from "react"

import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js"
import TransferBox from "./components-app/TransferBox"
import Navbar from "./components-layout/navbar"
import { AsyncButton } from "./components-app/common/Button"
import Wallet from "./components-app/Wallet"

export default function Page() {
  let [wallet, setWallet] = useState({ pair: null, balance: 0 });

  const handleGenerate = () => {
    const keypair = Keypair.generate();
    const wallet = {
      pair: keypair,
      balance: 0
    }
    setWallet(wallet);
    localStorage.setItem("wallet", JSON.stringify(wallet));
    console.log(keypair.publicKey)
  }

  const queryBalance = async (pubKey: any) => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'))
      return connection.getBalance(wallet.pair.publicKey).then(res => {
        setWallet({ ...wallet, balance: res / LAMPORTS_PER_SOL })
        return res
      })
    } catch (error) {
      alert(error)
    }
  }

  const requestAirdrop = async (pk: PublicKey, amount: number = 1) => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'))

      await connection.requestAirdrop(pk, LAMPORTS_PER_SOL * amount).then(async (sign) => {
        const latestBlockhash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
          signature: sign,
        }).then(async (res) => {
          console.log(res.value)
          const balance = await queryBalance(pk);
          alert(balance)
        })
      })




    } catch (error) {
      alert(error)
    }
  }

  const handleTransaction = async (from: Keypair, to: PublicKey, amount: number) => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"));

      const transfer = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: LAMPORTS_PER_SOL * amount
        })
      );

      const sign = await sendAndConfirmTransaction(connection, transfer, [from]);
      const latestBlockhash = await connection.getLatestBlockhash();

      const res = await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: sign,
      });
      alert(`Transaction info: ${res.value}`)
      return res;
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    const wallet = JSON.parse(localStorage.getItem("wallet"))
    setWallet(wallet ?? { pubKey: null, privKey: null, balance: 0 })
  }, [])

  return (
    <div className={"flex flex-col min-h-screen justify-between bg-base-03"}>
      <Navbar>
        <Wallet wallet={wallet} />
        {wallet.pair ?
          <>
            <AsyncButton title={"Get Balance"} fn={async () => {
              await queryBalance(wallet.pair.publicKey)
            }} />
            <AsyncButton title={"Request Airdrop"} fn={async () => {
              await requestAirdrop(wallet.pair.publicKey)
            }} />
            <AsyncButton title={"KeyGen"} fn={handleGenerate} />
          </>
          :
          <AsyncButton title={"KeyGen"} fn={handleGenerate} />

        }
      </Navbar>
      <div className={"flex-1 flex flex-col items-center px-1 md:px-3"}>
        <div className={"mt-10 md:mt-20 w-full max-w-md z-10"}>
          <TransferBox transactionHandler={handleTransaction} from={wallet.pair} />
        </div>
      </div>
    </div>

  )
}
