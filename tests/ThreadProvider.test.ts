import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import { ThreadProvider } from "../src";

describe("Testing Thread Provider", () => {
  const wallet = new NodeWallet(new Keypair());
  const provider = new ThreadProvider(wallet, clusterApiUrl("devnet"));

  it("Get Thread Address", async () => {
    let [pubkey, bump] = provider.getThreadPDA(wallet.publicKey, "test");
  });

  it("Get Thread Account", async () => {
    let a = await provider.getThreadAccount(
      new PublicKey("F87VXAhNtfAMzi1XSMSb8Hjxs5QkdUNzbqXNmLTMPwu4")
    );
    console.log(a);
  });
});
