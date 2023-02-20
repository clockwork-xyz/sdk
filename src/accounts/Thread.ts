import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import {
  ExecContext,
  ClockData,
  SerializableInstruction,
  Trigger,
} from "../models";

type Thread = {
  authority: PublicKey;
  bump: number;
  createdAt: ClockData;
  execContext: null | ExecContext;
  fee: BN;
  id: Buffer;
  instructions: SerializableInstruction[];
  name: string;
  nextInstruction: null | SerializableInstruction;
  paused: boolean;
  rateLimit: BN;
  trigger: Trigger;
};

export default Thread;
