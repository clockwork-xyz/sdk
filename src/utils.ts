import { TransactionInstruction } from "@solana/web3.js";
import { SerializableInstruction } from "./models";

function parseTransactionInstructions(
  instructions: TransactionInstruction[]
): SerializableInstruction[] {
  let _instructions: SerializableInstruction[] = [];
  instructions.forEach((instruction) => {
    _instructions.push({
      programId: instruction.programId,
      accounts: instruction.keys,
      data: instruction.data,
    });
  });
  return _instructions;
}

export { parseTransactionInstructions };
