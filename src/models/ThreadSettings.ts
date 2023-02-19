import { BN } from "@coral-xyz/anchor";
import SerializableInstruction from "./SerializableInstruction";
import { TriggerInput } from "./Trigger";

type ThreadSettings = {
  fee: BN | null;
  instructions: SerializableInstruction[] | null;
  name: string | null;
  rateLimit: BN | null;
  trigger: TriggerInput | null;
};

type ThreadSettingsInput = {
  fee?: BN;
  instructions?: SerializableInstruction[];
  name?: string;
  rateLimit?: BN;
  trigger?: TriggerInput;
};

export { ThreadSettings, ThreadSettingsInput };
