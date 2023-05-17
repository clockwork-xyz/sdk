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

type TimestampTriggerContext = {
  startedAt: BN;
};

type PythTriggerContext = {
  price: BN;
};

type TriggerContext =
  | AccountTriggerContext
  | CronTriggerContext
  | NowTriggerContext
  | SlotTriggerContext
  | EpochTriggerContext
  | TimestampTriggerContext
  | PythTriggerContext;

export default TriggerContext;
