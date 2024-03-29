import { BN } from "@coral-xyz/anchor";

type ClockData = {
  /// The current slot.
  slot: BN;
  /// The bank epoch.
  epoch: BN;
  /// The current unix timestamp.
  unixTimestamp: BN;
};

export default ClockData;
