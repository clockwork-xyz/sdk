import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

type Worker = {
  /// The worker's authority (owner).
  authority: PublicKey;
  /// The number of lamports claimable by the authority as commission for running the worker.
  commissionBalance: BN;
  /// Integer between 0 and 100 determining the percentage of fees worker will keep as commission.
  commissionRate: BN;
  /// The worker's id.
  id: BN;
  /// The worker's signatory address (used to sign txs).
  signatory: PublicKey;
  /// The number delegations allocated to this worker.
  totalDelegations: BN;
};

export default Worker;
