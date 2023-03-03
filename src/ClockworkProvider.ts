import * as anchor from "@coral-xyz/anchor";
import { 
  ConfirmOptions,
  Connection,
  PublicKey,
  TransactionInstruction
} from "@solana/web3.js";

import { ThreadProgram } from "./programs/thread/types";
import ThreadProgramIdl from "./programs/thread/idl.json";
import { NetworkProgram } from "./programs/network/types";
import NetworkProgramIdl from "./programs/network/idl.json";

import { Thread, Worker } from "./accounts";
import { ThreadSettingsInput, TriggerInput } from "./models";
import {
  parseThreadSettingsInput,
  parseTransactionInstruction,
  parseTransactionInstructions,
} from "./utils";

class ClockworkProvider {
  threadProgram: anchor.Program<ThreadProgram>;
  networkProgram: anchor.Program<NetworkProgram>;

  constructor(
    wallet: anchor.Wallet,
    connection: Connection,
    opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions()
  ) {
    const provider = new anchor.AnchorProvider(connection, wallet, opts);
    this.threadProgram = new anchor.Program<ThreadProgram>(
      ThreadProgramIdl as anchor.Idl as ThreadProgram,
      ThreadProgramIdl.metadata.address,
      provider
    );
    this.networkProgram = new anchor.Program<NetworkProgram>(
      NetworkProgramIdl as anchor.Idl as NetworkProgram,
      NetworkProgramIdl.metadata.address,
      provider
    );
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
      this.threadProgram.programId
    );
  }

  /**
   * Get Worker PDA. Returns the public key and bump.
   *
   * @param id worker id
   */
  getWorkerPDA(id: string): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("worker"), new anchor.BN(id).toArrayLike(Buffer, "be", 8)],
      this.networkProgram.programId
    );
  }

  /**
   * Get Thread Account Data Deserialized.
   *
   * @param threadPubkey thread public key
   */
  async getThreadAccount(threadPubkey: PublicKey): Promise<Thread> {
    const threadAccount = await this.threadProgram.account.thread.fetch(
      threadPubkey
    );
    return threadAccount;
  }

  /**
   * Get Worker Account Data Deserialized.
   *
   * @param workerPubkey worker public key
   */
  async getWorkerAccount(workerPubkey: PublicKey): Promise<Worker> {
    const workerAccount = await this.networkProgram.account.worker.fetch(
      workerPubkey
    );
    return workerAccount;
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

    const tx = await this.threadProgram.methods
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
    closeTo: PublicKey = this.threadProgram.provider.publicKey
  ): Promise<string> {
    const tx = await this.threadProgram.methods
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
   * Pause a thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to pause.
   */
  async threadPause(
    authority: PublicKey,
    threadPubkey: PublicKey
  ): Promise<string> {
    const tx = await this.threadProgram.methods
      .threadPause()
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .rpc();
    return tx;
  }

  /**
   * Resume a thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to resume.
   */
  async threadResume(
    authority: PublicKey,
    threadPubkey: PublicKey
  ): Promise<string> {
    const tx = await this.threadProgram.methods
      .threadResume()
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .rpc();
    return tx;
  }

  /**
   * Reset a thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to reset.
   */
  async threadReset(authority: PublicKey, threadPubkey: PublicKey) {
    const tx = await this.threadProgram.methods
      .threadReset()
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .rpc();
    return tx;
  }

  /**
   * Withdraw from thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to withdraw from.
   * @param payTo The account to withdraw lamports to (default payer)
   */
  async threadWithdraw(
    authority: PublicKey,
    threadPubkey: PublicKey,
    amount: number,
    payTo: PublicKey = this.threadProgram.provider.publicKey
  ): Promise<string> {
    const tx = await this.threadProgram.methods
      .threadWithdraw(new anchor.BN(amount))
      .accounts({
        authority: authority,
        thread: threadPubkey,
        payTo,
      })
      .rpc();
    return tx;
  }

  /**
   * Update a thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to update.
   * @param settings new thread settings.
   */
  async threadUpdate(
    authority: PublicKey,
    threadPubkey: PublicKey,
    settings: ThreadSettingsInput
  ): Promise<string> {
    const tx = await this.threadProgram.methods
      .threadUpdate(parseThreadSettingsInput(settings))
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .rpc();
    return tx;
  }

  /**
   * Add instruction to a thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to add instruction to.
   * @param instructions instructions to add.
   */
  async threadInstructionAdd(
    authority: PublicKey,
    threadPubkey: PublicKey,
    instruction: TransactionInstruction
  ): Promise<string> {
    const tx = await this.threadProgram.methods
      .threadInstructionAdd(parseTransactionInstruction(instruction))
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .rpc();
    return tx;
  }

  /**
   * Remove an instruction from a thread. Returns Transaction Signature.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to remove instruction from.
   * @param index instruction index to be removed.
   */
  async threadInstructionRemove(
    authority: PublicKey,
    threadPubkey: PublicKey,
    index: number
  ): Promise<string> {
    const tx = await this.threadProgram.methods
      .threadInstructionRemove(new anchor.BN(index))
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .rpc();
    return tx;
  }

  // TODO: Return CrateInfo rather than tx.
  /**
   * Get Crate Info.
   *
   */
  async getCrateInfo(): Promise<string> {
    let tx = await this.threadProgram.methods.getCrateInfo().accounts({}).rpc();
    return tx;
  }
}

export default ClockworkProvider;
