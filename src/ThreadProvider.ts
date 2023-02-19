import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";

import { ThreadProgram } from "./programs/thread/types";
import ThreadProgramIdl from "./programs/thread/idl.json";
import { Thread } from "./accounts";
import { TriggerInput } from "./models";
import { parseTransactionInstructions } from "./utils";

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

  /**
   * Get Thread PDA. Returns the public key and bump.
   *
   * @param authority thread authority
   * @param id thread id
   */
  getThreadPDA(authority: PublicKey, id: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("thread"), authority.toBuffer(), Buffer.from(id)],
      this.program.programId
    );
  }

  // can also return anchor.IdlAccounts<ThreadProgram>["thread"] but it's not strongly typed
  /**
   * Get Thread Account Data Deserialized.
   *
   * @param threadPubkey thread public key
   */
  async getThreadAccount(threadPubkey: PublicKey): Promise<Thread> {
    const threadAccount = await this.program.account.thread.fetch(threadPubkey);
    return threadAccount;
  }

  /**
   * Create a new thread. Returns Transaction Signature.
   *
   * @param authority thread authority
   * @param id thread id
   * @param instructions thread instructions
   * @param trigger thread trigger
   * @param amount amount to transfer to the thread in lamports (default 0)
   */
  async threadCreate(
    authority: PublicKey,
    id: string,
    instructions: TransactionInstruction[],
    trigger: TriggerInput,
    amount: number = 0
  ): Promise<string> {
    const threadPubkey = this.getThreadPDA(authority, id.toString())[0];

    const tx = await this.program.methods
      .threadCreate(
        new anchor.BN(amount),
        Buffer.from(id),
        // TODO: parsing can be removed accounts => keys
        parseTransactionInstructions(instructions),
        trigger
      )
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .rpc();

    return tx;
  }

  /**
   * Delete a thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to delete.
   * @param closeTo The address to return the data rent lamports to (default payer).
   */
  async threadDelete(
    authority: PublicKey,
    threadPubkey: PublicKey,
    closeTo: PublicKey = this.program.provider.publicKey
  ): Promise<string> {
    const tx = await this.program.methods
      .threadDelete()
      .accounts({
        authority: authority,
        thread: threadPubkey,
        closeTo,
      })
      .rpc();
    return tx;
  }

  /**
   * Delete a thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to pause.
   */
  async threadPause(authority: PublicKey, threadPubkey: PublicKey) {
    const tx = await this.program.methods
      .threadPause()
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .rpc();
    return tx;
  }

  /**
   * Delete a thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to resume.
   */
  async threadResume(authority: PublicKey, threadPubkey: PublicKey) {
    const tx = await this.program.methods
      .threadResume()
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .rpc();
    return tx;
  }

  /**
   * Delete a thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to reset.
   */
  async threadReset(authority: PublicKey, threadPubkey: PublicKey) {
    const tx = await this.program.methods
      .threadReset()
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .rpc();
    return tx;
  }
}

export default ThreadProvider;
