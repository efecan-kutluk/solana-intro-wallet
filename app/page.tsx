"use client"
import { useState, useEffect } from "react"

import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmRawTransaction, sendAndConfirmTransaction } from "@solana/web3.js"
import TransferBox from "./components-app/TransferBox"
import Navbar from "./components-layout/navbar"
import { AsyncButton } from "./components-app/common/Button"
import Wallet from "./components-app/Wallet"

export default function Page() {
  let [wallet, setWallet] = useState({pubKey: null, privKey: null, balance: 0});

  const handleGenerate = () => {
    const keypair = Keypair.generate();
    const wallet = {
      pubKey: keypair.publicKey,
      privKey: keypair.secretKey,
      balance: 0
    }
    setWallet(wallet);
    localStorage.setItem("wallet", JSON.stringify(wallet));
    console.log(keypair.publicKey)
  }

  const queryBalance = async (pubKey: any) => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'))
      return connection.getBalance(wallet.pubKey).then(res => {
        setWallet({...wallet, balance: res / LAMPORTS_PER_SOL})
        return res
      })
    } catch (error) {
      alert(error)
    }
  }

  const requestAirdrop = async (pk: PublicKey, amount: number = 1) => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'))

      const sign = await connection.requestAirdrop(pk, LAMPORTS_PER_SOL * amount);
      const latestBlockhash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: sign,
      });

      const balance = await queryBalance(pk);
      alert(balance)

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

      await sendAndConfirmTransaction(connection, transfer, [from]);
    } catch (err){
      alert(err.message)
    }
  }

  useEffect(() => {
    const wallet = JSON.parse(localStorage.getItem("wallet"))
    setWallet(wallet ?? {pubKey: null, privKey: null, balance: 0})
  }, [])

  return (
    <div className={"flex flex-col min-h-screen justify-between bg-base-03"}>
    <Navbar>
      <Wallet wallet={wallet}/>
      {wallet.pubKey ? 
      <>
        <AsyncButton title={"Get Balance"} fn={async () => {
          await queryBalance(wallet.pubKey)
        }}/>
        <AsyncButton title={"Request Airdrop"} fn={async () => {
          await requestAirdrop(wallet.pubKey)
        }}/>
        <AsyncButton title={"KeyGen"} fn={handleGenerate}/>
      </>
      :
      <AsyncButton title={"KeyGen"} fn={handleGenerate}/>

      }
    </Navbar>
    <div className={"flex-1 flex flex-col items-center px-1 md:px-3"}>
      <div className={"mt-10 md:mt-20 w-full max-w-md z-10"}>
        <TransferBox transactionHandler={handleTransaction} from={wallet}/>
      </div>
    </div>
  </div>

  )
}
