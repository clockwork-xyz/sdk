import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { ThreadProvider } from "../src";
import * as anchor from "@coral-xyz/anchor";
import { assert } from "chai";

describe("Testing Thread Provider", () => {
  const wallet = new NodeWallet(new Keypair());
  const connection = new Connection(clusterApiUrl("devnet"));
  const provider = new ThreadProvider(wallet, connection);
  let threadPubkey: PublicKey;

  it("Airdrop", async () => {
    const tx = await connection.requestAirdrop(
      wallet.publicKey,
      0.01 * LAMPORTS_PER_SOL
    );
    await new Promise((r) => setTimeout(r, 2000));
    console.log(tx);
  });

  it("Initialize Thread", async () => {
    let tx = await provider.threadCreate(
      wallet.publicKey,
      Buffer.from("ThreadProviderTest"),
      new anchor.BN(10),
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
    await new Promise((r) => setTimeout(r, 20000));
    console.log(threadPubkey.toBase58());
  });

  it("Get Thread Account", async () => {
    await new Promise((r) => setTimeout(r, 10000));
    let threadAccount = await provider.getThreadAccount(threadPubkey);
    assert.equal(
      threadAccount.authority.toBase58(),
      wallet.publicKey.toBase58()
    );
  });
});
