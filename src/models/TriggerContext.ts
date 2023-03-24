import { BN } from "@coral-xyz/anchor";

type AccountTriggerContext = {
  dataHash: BN;
};

type CronTriggerContext = {
  startedAt: BN;
};

type NowTriggerContext = {};

type SlotTriggerContext = {
  startedAt: BN;
};

type EpochTriggerContext = {
  startedAt: BN;
};

type TriggerContext =
  | AccountTriggerContext
  | CronTriggerContext
  | NowTriggerContext
  | SlotTriggerContext
  | EpochTriggerContext;

export default TriggerContext;
