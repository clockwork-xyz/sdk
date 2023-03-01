import { PublicKey } from "@solana/web3.js";

/**
 * The stand-in pubkey for delegating a payer address to a worker.
 * All workers are re-imbursed by the user for lamports spent during this delegation.
 * https://docs.rs/clockwork-utils/latest/clockwork_utils/static.PAYER_PUBKEY.html
 */
const PAYER_PUBKEY = new PublicKey(
    "C1ockworkPayer11111111111111111111111111111"
);

export { PAYER_PUBKEY };
