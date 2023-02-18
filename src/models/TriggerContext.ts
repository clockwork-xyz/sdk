import { BN } from "@project-serum/anchor";

interface AccountTriggerContext {
  dataHash: BN;
}

interface CronTriggerContext {
  startedAt: number;
}

interface ImmediateTriggerContext {}

type TriggerContext =
  | AccountTriggerContext
  | CronTriggerContext
  | ImmediateTriggerContext;

export default TriggerContext;
