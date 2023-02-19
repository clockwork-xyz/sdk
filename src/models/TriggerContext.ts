import { BN } from "@project-serum/anchor";

type AccountTriggerContext = {
  dataHash: BN;
};

type CronTriggerContext = {
  startedAt: number;
};

type ImmediateTriggerContext = {};

type TriggerContext =
  | AccountTriggerContext
  | CronTriggerContext
  | ImmediateTriggerContext;

export default TriggerContext;
