import { BN } from "@project-serum/anchor";

interface ClockData {
  /// The current slot.
  slot: BN;
  /// The bank epoch.
  epoch: BN;
  /// The current unix timestamp.
  unixTimestamp: BN;
}

export default ClockData;
