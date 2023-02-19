import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

type Account = {
  /// The address of the account to monitor.
  address: PublicKey;
  /// The byte offset of the account data to monitor.
  offset: BN;
  /// The size of the byte slice to monitor (must be less than 1kb)
  size: BN;
};

/// Allows an thread to be kicked off according to a one-time or recurring schedule.
type Cron = {
  /// The schedule in cron syntax. Value must be parsable by the `clockwork_cron` package.
  schedule: string;

  /// Boolean value indicating whether triggering moments may be skipped if they are missed (e.g. due to network downtime).
  /// If false, any "missed" triggering moments will simply be executed as soon as the network comes back online.
  skippable: boolean;
};

/// Allows an thread to be kicked off as soon as it's created.
type Now = {};

/// Allows a thread to be kicked off according to a slot.
type Slot = {
  slot: BN;
};

/// Allows a thread to be kicked off according to an epoch number.
type Epoch = {
  epoch: BN;
};

type Trigger = Account | Cron | Now | Slot | Epoch;
type TriggerInput =
  | { account: Account }
  | { cron: Cron }
  | { now: Now }
  | { slot: Slot }
  | { epoch: Epoch };

export { Trigger, TriggerInput, Account, Cron, Now, Slot, Epoch };
