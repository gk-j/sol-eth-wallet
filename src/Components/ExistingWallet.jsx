import React, { useState } from 'react';
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthWallet';

export default function SeedPhraseInput() {
  const [use24Words, setUse24Words] = useState(false);
  const wordCount = use24Words ? 24 : 12;
  const [phrases, setPhrases] = useState(Array(24).fill(""));
  const [showWallet,setShowWallet] = useState(false)

  const handleChange = (index, value) => {
    const updated = [...phrases];
    updated[index] = value;
    setPhrases(updated);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().split(/\s+/);
    const updated = [...phrases];
    for (let i = 0; i < Math.min(pasted.length, wordCount); i++) {
      updated[i] = pasted[i];
    }
    setPhrases(updated);
  };

  return (
    <>
    {!showWallet &&
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-xl font-semibold mb-4">Enter or paste your phrase</h1>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() =>{ setUse24Words(false);setPhrases(Array(24).fill(""));}}
          className={`px-4 py-2 rounded-md border ${
            !use24Words ? 'bg-white text-black' : 'bg-gray-800 text-white'
          }`}
        >
          Use 12 words
        </button>
        <button
          onClick={() => setUse24Words(true)}
          className={`px-4 py-2 rounded-md border ${
            use24Words ? 'bg-white text-black' : 'bg-gray-800 text-white'
          }`}
        >
          Use 24 words
        </button>
        <button
          onClick={(e) =>
            navigator.clipboard.readText().then((text) =>
              handlePaste({
                clipboardData: {
                  getData: () => text,
                },
                preventDefault: () => {},
              })
            )
          }
          className="px-4 py-2 bg-blue-700 rounded-md"
        >
          Paste
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
        {Array(wordCount)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-sm text-gray-400 mb-1">{index + 1}</label>
              <input
                type="text"
                value={phrases[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onPaste={handlePaste}
                className="p-2 bg-gray-800 border border-gray-600 rounded-md text-white outline-none"
              />
            </div>
          ))}
      </div>
      <button onClick={()=>{setShowWallet(true)}} className="px-4 mt-5 py-2 bg-blue-700 rounded-md">
          import
        </button>
    </div>}
    {showWallet && <SolanaWallet mnemonic={phrases.join(" ")}/>}
    {showWallet && <EthWallet mnemonic={phrases.join(" ")}/>}
    </>
  );
}