import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    return (<div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
  <button
    onClick={function () {
      const seed = mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys,{ id: currentIndex + 1, key: keypair.publicKey }]);
    }}
    className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-md mb-6 text-white font-medium shadow"
  >
     Add Solana Wallet
  </button>

  <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6 shadow-lg">
    <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
      🔐 Solona Wallet Public Keys
    </h2>
    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
      {publicKeys.map((wallet) => (
        <div
            key={wallet.key.toBase58()}
            className="flex items-center gap-4 bg-gray-700 p-3 rounded-md text-sm border border-gray-600"
        >
            <span className="text-gray-400 font-mono w-10"> {wallet.id}</span>
            <span className="break-all">{wallet.key.toBase58()}</span>
        </div>
        ))}
    </div>
  </div>
</div>)
}