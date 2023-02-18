import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

import { ThreadProgram } from "./programs/thread/types";
import ThreadProgramIdl from "./programs/thread/idl.json";
import { Thread } from "./accounts";

class ThreadProvider {
  program: anchor.Program<ThreadProgram>;

  constructor(wallet: anchor.Wallet, endpoint: string) {
    const connection = new Connection(endpoint);
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

  async getThreadAccount(threadPubkey: PublicKey): Promise<Thread> {
    const threadAccount = await this.program.account.thread.fetch(threadPubkey);

    return {
      authority: threadAccount.authority,
      bump: threadAccount.bump,
      createdAt: {
        epoch: threadAccount.createdAt.epoch,
        slot: threadAccount.createdAt.slot,
        unixTimestamp: threadAccount.createdAt.unixTimestamp,
      },
      execContext: threadAccount.execContext
        ? {
            execIndex: threadAccount.execContext.execsSinceReimbursement,
            execsSinceReimbursement:
              threadAccount.execContext.execsSinceReimbursement,
            execsSinceSlot: threadAccount.execContext.execsSinceSlot,
            lastExecAt: threadAccount.execContext.lastExecAt,
            triggerContext: threadAccount.execContext.triggerContext,
          }
        : null,
      fee: threadAccount.fee,
      id: threadAccount.id,
      instructions: threadAccount.instructions,
      name: threadAccount.name,
      nextInstruction: threadAccount.nextInstruction,
      paused: threadAccount.paused,
      rateLimit: threadAccount.rateLimit,
    };
  }
}

export default ThreadProvider;
