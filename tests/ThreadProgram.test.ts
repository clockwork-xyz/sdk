import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { ClockworkProvider } from "../src";
import { assert } from "chai";
import { BN, AnchorProvider} from "@coral-xyz/anchor";

describe("Testing Thread Program", () => {
  const wallet = new NodeWallet(new Keypair());
  const connection = new Connection(clusterApiUrl("devnet"));
  const anchorProvider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
  const provider = ClockworkProvider.fromAnchorProvider(anchorProvider);
  let threadPubkey: PublicKey;

  it("Airdrop", async () => {
    const tx = await connection.requestAirdrop(
      wallet.publicKey,
      1 * LAMPORTS_PER_SOL
    );
    await new Promise((r) => setTimeout(r, 5000));
    console.log(tx);
  });

  it("Initialize Thread", async () => {
    let tx = await provider.threadCreate(
      wallet.publicKey,
      "ThreadProgramTest",
      [],
      { now: {} },
      0.1 * LAMPORTS_PER_SOL
    );

    console.log(tx);
  });

  it("Get Thread Address", async () => {
    let [pubkey, _] = provider.getThreadPDA(
      wallet.publicKey,
      "ThreadProgramTest"
    );
    threadPubkey = pubkey;
    console.log(threadPubkey.toBase58());
  });

  it("Get Thread Account", async () => {
    let i = 1;
    while (true) {
      try {
        let threadAccount = await provider.getThreadAccount(threadPubkey);
        assert.equal(threadAccount.id.toString(), "ThreadProgramTest");
        break;
      } catch (e) {
        console.log(
          "retrying in " + i + " seconds... max retries [" + i + "/10]"
        );
        if (i == 10) throw e;
        await new Promise((r) => setTimeout(r, i * 1000));
        i += 1;
      }
    }
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
      name: "TestUpdateThread",
      rateLimit: new BN(32),
      trigger: { now: {} },
    });
    console.log(tx);
  });

  //it("Thread Instruction Add", async () => {
  //  let transfer_ix = SystemProgram.transfer({
  //    fromPubkey: wallet.publicKey,
  //    toPubkey: wallet.publicKey,
  //    lamports: 1000,
  //  });
  //  let tx = await provider.threadInstructionAdd(
  //    wallet.publicKey,
  //    threadPubkey,
  //    transfer_ix
  //  );
  //  console.log(tx);
  //});

  //it("Thread Instruction Remove", async () => {
  //  let tx = await provider.threadInstructionRemove(
  //    wallet.publicKey,
  //    threadPubkey,
  //    0
  //  );
  //  console.loggjggjtx);
  //});

  it("Get Crate Info", async () => {
    let tx = await provider.getCrateInfo();
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
