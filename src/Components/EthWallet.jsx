import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrentIndex(currentIndex + 1);
    setAddresses([
      ...addresses,
      { id: currentIndex + 1, address: wallet.address }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">🦊 Ethereum Wallet Generator</h1>

      <button
        onClick={handleAddWallet}
        className="bg-green-600 hover:bg-green-700 transition px-6 py-2 rounded-md mb-6 text-white font-medium shadow"
      >
        ➕ Add ETH Wallet
      </button>

      <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
          🧾 ETH Wallet Addresses
        </h2>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {addresses.map((wallet) => (
            <div
              key={wallet.address}
              className="flex items-center gap-4 bg-gray-700 p-3 rounded-md text-sm border border-gray-600"
            >
              <span className="text-gray-400 font-mono w-12">#{wallet.id}</span>
              <span className="break-all">{wallet.address}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};