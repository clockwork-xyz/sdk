import * as anchor from "@coral-xyz/anchor";
import { 
  ConfirmOptions,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { ThreadProgram } from "./programs/thread/types";
import ThreadProgramIdl from "./programs/thread/idl.json";

import { Thread } from "./accounts";
import { ThreadSettingsInput, TriggerInput } from "./models";
import {
  parseThreadSettingsInput,
  parseTransactionInstruction,
  parseTransactionInstructions,
} from "./utils";

/**
 * Wallet interface for objects that can be used to sign provider transactions.
 */
export interface ClockworkProviderWallet {
  signTransaction(tx: Transaction): Promise<Transaction>;
  signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
  publicKey: PublicKey;
}

class ClockworkProvider {
  threadProgram: anchor.Program<ThreadProgram>;
  anchorProvider: anchor.AnchorProvider;

  constructor(
    wallet: ClockworkProviderWallet,
    connection: Connection,
    opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions()
  ) {
    this.anchorProvider = new anchor.AnchorProvider(connection, wallet, opts);
    this.threadProgram = new anchor.Program<ThreadProgram>(
      ThreadProgramIdl as anchor.Idl as ThreadProgram,
      ThreadProgramIdl.metadata.address,
      this.anchorProvider
    );
  }
 
  /**
   * Build a ClockworkProvider from an AnchorProvider
   *
   * @param authority thread authority
   */
  static fromAnchorProvider(provider: anchor.AnchorProvider): ClockworkProvider {
    const clockworkProvider = new ClockworkProvider(
      provider.wallet,
      provider.connection,
      provider.opts
    );
    return clockworkProvider;
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
   * Create a new thread.
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
  ): Promise<TransactionInstruction> {
    const threadPubkey = this.getThreadPDA(authority, id.toString())[0];
    return await this.threadProgram.methods
      .threadCreate(
        new anchor.BN(amount),
        Buffer.from(id),
        // TODO: parsing can be removed accounts => keys
        parseTransactionInstructions(instructions),
        trigger
      )
      .accounts({
        authority: authority,
        payer: authority,
        systemProgram: anchor.web3.SystemProgram.programId,
        thread: threadPubkey,
      })
      .instruction();
  }

  /**
   * Delete a thread.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to delete.
   * @param closeTo The address to return the data rent lamports to (default payer).
   */
  async threadDelete(
    authority: PublicKey,
    threadPubkey: PublicKey,
    closeTo: PublicKey = this.threadProgram.provider.publicKey
  ): Promise<TransactionInstruction> {
    return await this.threadProgram.methods
      .threadDelete()
      .accounts({
        authority: authority,
        thread: threadPubkey,
        closeTo,
      })
      .instruction();
  }

  /**
   * Pause a thread.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to pause.
   */
  async threadPause(
    authority: PublicKey,
    threadPubkey: PublicKey
  ): Promise<TransactionInstruction> {
    return await this.threadProgram.methods
      .threadPause()
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .instruction();
  }

  /**
   * Resume a thread.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to resume.
   */
  async threadResume(
    authority: PublicKey,
    threadPubkey: PublicKey
  ): Promise<TransactionInstruction> {
    return await this.threadProgram.methods
      .threadResume()
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .instruction();
  }

  /**
   * Reset a thread.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to reset.
   */
  async threadReset(authority: PublicKey, threadPubkey: PublicKey): Promise<TransactionInstruction> {
    return await this.threadProgram.methods
      .threadReset()
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .instruction();
  }

  /**
   * Withdraw from thread.
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
  ): Promise<TransactionInstruction> {
    return await this.threadProgram.methods
      .threadWithdraw(new anchor.BN(amount))
      .accounts({
        authority: authority,
        thread: threadPubkey,
        payTo,
      })
      .instruction();
  }

  /**
   * Update a thread.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to update.
   * @param settings new thread settings.
   */
  async threadUpdate(
    authority: PublicKey,
    threadPubkey: PublicKey,
    settings: ThreadSettingsInput
  ): Promise<TransactionInstruction> {
    return await this.threadProgram.methods
      .threadUpdate(parseThreadSettingsInput(settings))
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .instruction();
  }

  /**
   * Add instruction to a thread.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to add instruction to.
   * @param instructions instructions to add.
   */
  async threadInstructionAdd(
    authority: PublicKey,
    threadPubkey: PublicKey,
    instruction: TransactionInstruction
  ): Promise<TransactionInstruction> {
    return await this.threadProgram.methods
      .threadInstructionAdd(parseTransactionInstruction(instruction))
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .instruction();
  }

  /**
   * Remove an instruction from a thread.
   *
   * @param authority The authority (owner) of the thread.
   * @param threadPubkey thread to remove instruction from.
   * @param index instruction index to be removed.
   */
  async threadInstructionRemove(
    authority: PublicKey,
    threadPubkey: PublicKey,
    index: number
  ): Promise<TransactionInstruction> {
    return await this.threadProgram.methods
      .threadInstructionRemove(new anchor.BN(index))
      .accounts({
        authority: authority,
        thread: threadPubkey,
      })
      .instruction();
  }

  /**
   * Get Crate Info.
   *
   */
  async getCrateInfo(): Promise<TransactionInstruction> {
    return await this.threadProgram.methods.getCrateInfo().accounts({}).instruction();
  }
}

export default ClockworkProvider;
