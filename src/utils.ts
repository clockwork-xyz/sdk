import { BN } from "@coral-xyz/anchor";
import { TransactionInstruction } from "@solana/web3.js";
import {
  SerializableInstruction,
  ThreadSettings,
  ThreadSettingsInput,
} from "./models";

function parseTransactionInstructions(
  instructions: TransactionInstruction[]
): SerializableInstruction[] {
  let _instructions: SerializableInstruction[] = [];
  instructions.forEach((instruction) => {
    _instructions.push(parseTransactionInstruction(instruction));
  });
  return _instructions;
}

function parseTransactionInstruction(
  instruction: TransactionInstruction
): SerializableInstruction {
  return {
    programId: instruction.programId,
    accounts: instruction.keys,
    data: instruction.data,
  };
}

function parseThreadSettingsInput(
  settings: ThreadSettingsInput
): ThreadSettings {
  return {
    fee: settings.fee ? new BN(settings.fee) : null,
    rateLimit: settings.rateLimit ? new BN(settings.rateLimit) : null,
    instructions: settings.instructions ? settings.instructions : null,
    name: settings.name ? settings.name : null,
    trigger: settings.trigger ? settings.trigger : null,
  };
}

export {
  parseTransactionInstructions,
  parseTransactionInstruction,
  parseThreadSettingsInput,
};
