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
import { ThreadSettings } from "../src/models";
import { BN } from "@coral-xyz/anchor";

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
      { now: {} },
      0.1 * LAMPORTS_PER_SOL
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

  it("Pause Thread", async () => {
    let tx = await provider.threadPause(wallet.publicKey, threadPubkey);
    console.log(tx);
  });

  it("Resume Thread", async () => {
    let tx = await provider.threadResume(wallet.publicKey, threadPubkey);
    console.log(tx);
  });

  it("Reset Thread", async () => {
    let tx = await provider.threadReset(wallet.publicKey, threadPubkey);
    console.log(tx);
  });

  it("Update Thread", async () => {
    let tx = await provider.threadUpdate(wallet.publicKey, threadPubkey, {
      fee: null,
      instructions: null,
      name: "TestUpdateThread",
      rateLimit: new BN(32),
      trigger: { now: {} },
    });
    console.log(tx);
  });

  it("Withdraw Thread", async () => {
    let tx = await provider.threadWithdraw(
      wallet.publicKey,
      threadPubkey,
      0.01 * LAMPORTS_PER_SOL
    );
    console.log(tx);
  });

  it("Delete Thread", async () => {
    let tx = await provider.threadDelete(wallet.publicKey, threadPubkey);
    console.log(tx);
  });
});
