import { PublicKey } from "@solana/web3.js";

type SerializableAccount = {
  /// An account's public key
  pubkey: PublicKey;
  /// True if an Instruction requires a Transaction signature matching `pubkey`.
  isSigner: boolean;
  /// True if the `pubkey` can be loaded as a read-write account.
  isWritable: boolean;
};

type SerializableInstruction = {
  /// Pubkey of the instruction processor that executes this instruction
  programId: PublicKey;
  /// Metadata for what accounts should be passed to the instruction processor
  accounts: SerializableAccount[];
  /// Opaque data passed to the instruction processor
  data: Buffer;
};

export { SerializableInstruction, SerializableAccount };
