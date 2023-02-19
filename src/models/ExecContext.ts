import { BN } from "@project-serum/anchor";
import TriggerContext from "./TriggerContext";

type ExecContext = {
  /**
   * Index of the next instruction to be executed.
   */
  execIndex: BN;
  /**
   * Number of execs since the last tx reimbursement.
   */
  execsSinceReimbursement: BN;
  /**
   * Number of execs in this slot.
   */
  execsSinceSlot: BN;

  /**
   * Slot of the last exec
   */
  lastExecAt: BN;

  /**
   * Context for the triggering condition
   */
  triggerContext: TriggerContext;
};

export default ExecContext;
