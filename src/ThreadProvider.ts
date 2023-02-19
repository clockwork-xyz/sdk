import * as anchor from "@coral-xyz/anchor";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { ThreadProgram } from "./programs/thread/types";
import ThreadProgramIdl from "./programs/thread/idl.json";
import { Thread } from "./accounts";
import { SerializableInstruction, Trigger, TriggerInput } from "./models";

class ThreadProvider {
  program: anchor.Program<ThreadProgram>;
  constructor(wallet: anchor.Wallet, connection: Connection) {
    const provider = new anchor.AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });
    const programId = ThreadProgramIdl.metadata.address;
    const program = new anchor.Program<ThreadProgram>(
      ThreadProgramIdl as anchor.Idl as ThreadProgram,
      programId,
      provider
    );
    this.program = program;
  }

  getThreadPDA(authority: PublicKey, id: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("thread"), authority.toBuffer(), Buffer.from(id)],
      this.program.programId
    );
  }
  // can also return anchor.IdlAccounts<ThreadProgram>["thread"] but it's not strongly typed
  async getThreadAccount(threadPubkey: PublicKey): Promise<Thread> {
    const threadAccount = await this.program.account.thread.fetch(threadPubkey);
    return threadAccount;
  }

  /**
   * Creates a new transaction thread.
   *
   * @param authority thread authority
   * @param id thread id
   * @param amount amount to transfer to the thread in lamports
   * @param instructions thread instructions
   * @param trigger thread trigger
   */
  async threadCreate(
    authority: PublicKey,
    id: Buffer,
    amount: anchor.BN,
    instructions: SerializableInstruction[],
    trigger: TriggerInput
  ): Promise<string> {
    const threadPubkey = this.getThreadPDA(authority, id.toString())[0];

    const tx = await this.program.methods
      .threadCreate(amount, id, instructions, trigger)
      .accounts({
        authority: authority,
        payer: this.program.provider.publicKey,
        thread: threadPubkey,
      })
      .rpc();
    return tx;
  }

  async threadDelete() {}
  async ThreadPause() {}
  async ThreadResume() {}
  async ThreadUpdate() {}
}

export default ThreadProvider;
