import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { ThreadProvider } from "../src";
import { assert } from "chai";

describe("Testing Thread Provider", () => {
  const wallet = new NodeWallet(new Keypair());
  const connection = new Connection(clusterApiUrl("devnet"));
  const provider = new ThreadProvider(wallet, connection);
  let threadPubkey: PublicKey;

  it("Airdrop", async () => {
    const tx = await connection.requestAirdrop(
      wallet.publicKey,
      1 * LAMPORTS_PER_SOL
    );
    await new Promise((r) => setTimeout(r, 2000));
    console.log(tx);
  });

  it("Initialize Thread", async () => {
    let tx = await provider.threadCreate(
      wallet.publicKey,
      "ThreadProviderTest",
      [],
      { now: {} }
    );

    console.log(tx);
  });

  it("Get Thread Address", async () => {
    let [pubkey, _] = provider.getThreadPDA(
      wallet.publicKey,
      "ThreadProviderTest"
    );
    threadPubkey = pubkey;
    console.log(threadPubkey.toBase58());
    await new Promise((r) => setTimeout(r, 10000));
  });

  it("Get Thread Account", async () => {
    let threadAccount = await provider.getThreadAccount(threadPubkey);
    assert.equal(
      threadAccount.authority.toBase58(),
      wallet.publicKey.toBase58()
    );
  });

  it("Delete Thread", async () => {
    let tx = await provider.threadDelete(wallet.publicKey, threadPubkey);
    console.log(tx);
  });
});
