import { BN } from "@coral-xyz/anchor";
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

/// Allows a thread to be kicked off accounting to a unix timestamp.
type Timestamp = {
  unix_ts: BN
};

/// Allows a thread to be kicked off accounting to a Pyth price feed movement.
type Pyth = {
  /// The address of the price feed to monitor.
  price_feed: PublicKey;
  /// The equality operator (gte or lte) used to compare prices. 
  equality: EqualityInput;
  /// The limit price to compare the Pyth feed to. 
  limit: BN;
}

type GreaterThanOrEqual = {};
type LessThanOrEqual = {};
type Equality = GreaterThanOrEqual | LessThanOrEqual;
type EqualityInput = 
  | { greaterThanOrEqual: GreaterThanOrEqual }
  | { lessThanOrEqual: LessThanOrEqual };

type Trigger = Account | Cron | Now | Slot | Epoch | Timestamp | Pyth;
type TriggerInput =
  | { account: Account }
  | { cron: Cron }
  | { now: Now }
  | { slot: Slot }
  | { epoch: Epoch }
  | { timestamp: Timestamp }
  | { pyth: Pyth };

export { 
  Trigger,
  TriggerInput,
  Account,
  Cron,
  Now,
  Slot,
  Epoch,
  Timestamp,
  Pyth,
  GreaterThanOrEqual,
  LessThanOrEqual,
  Equality,
  EqualityInput,
};
