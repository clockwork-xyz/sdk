import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { ClockworkProvider } from "../src";
import { assert } from "chai";

describe("Testing Netowork Program", () => {
  const wallet = new NodeWallet(new Keypair());
  const connection = new Connection(clusterApiUrl("devnet"));
  const provider = new ClockworkProvider(wallet, connection);
  let workerPubkey: PublicKey;

  it("Get Worker Address", async () => {
    let [pubkey, _] = provider.getWorkerPDA("8");
    workerPubkey = pubkey;
    console.log(workerPubkey.toBase58());
  });

  it("Get Worker Account", async () => {
    let workerAccount = await provider.getWorkerAccount(workerPubkey);
    assert.equal(workerAccount.id.toNumber(), 8);
  });
});
