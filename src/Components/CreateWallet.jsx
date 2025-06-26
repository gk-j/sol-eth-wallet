import { generateMnemonic } from "bip39";
import { useEffect, useState } from "react";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";

export default function CreateWallet() {
  const [mnemonic, setMnemonic] = useState("");

  useEffect(() => {
    const generate = async () => {
      const mn = await generateMnemonic();
      setMnemonic(mn);
    };

    generate(); // run the async function
  }, []);

  return (
    <div>
      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </div>
  );
}
