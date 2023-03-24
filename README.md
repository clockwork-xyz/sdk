<p align="center">
  <img src=https://imgur.com/IpOp9W3.jpg>
</p>

<h1 align="center">Clockwork SDK</h1>
<p align="center"><strong>Clockwork Typescript SDK</strong></p>

<div align="center">

  <a href="https://opensource.org/licenses/MIT">![License](https://img.shields.io/badge/License-MIT-yellow.svg)</a>  

</div>

## Getting Started

For a quickstart guide and in depth tutorials, see the [Clockwork Docs](https://docs.clockwork.xyz/about/readme).
To jump straight to examples, go [here](https://github.com/clockwork-xyz/sdk/tree/main/tests). For the latest Rust API documentation, see [Clockwork Rust SDK](https://docs.rs/clockwork-sdk/latest/clockwork_sdk/).

## Note

- **Clockwork SDK is in active development, so all APIs are subject to change.**
- **This code is unaudited. Use at your own risk.**

## Usage

First, initialize a `ClockworkProvider`

```rust
const wallet = new NodeWallet(new Keypair());
const connection = new Connection(clusterApiUrl("devnet"));
const clockworkProvider = new ClockworkProvider(wallet, connection);

#or
const anchorProvider = new anchor.AnchorProvider(
        connection,
        wallet,
        anchor.AnchorProvider.defaultOptions()
);
const provider = new ClockworkProvider.fromAnchorProvider(provider);
```

Get Thread Address

```rust
const [pubkey, bump] = provider.getThreadPDA(
      wallet.publicKey,
      "ThreadProgramTest"
);
```

Initialize a Thread

```rust
const ix = await provider.threadCreate(
      wallet.publicKey,         // authority
      "ThreadProgramTest",      // id
      [],                       // instructions to execute
      { now: {} },              // thread trigger
      0.1 * LAMPORTS_PER_SOL    // amount to send to the thread
);
const tx = new Transaction().add(ix);
const signature = await provider.anchorProvider.sendAndConfirm(tx);
```

Get Thread Data Deserialized

```rust
const threadAccount = await provider.getThreadAccount(threadPubkey);
```

Pause/Resume/Reset/Delete/ Thread

```rust
const ix = await provider.threadPause(wallet.publicKey, threadPubkey);
const ix = await provider.threadResume(wallet.publicKey, threadPubkey);
const ix = await provider.threadReset(wallet.publicKey, threadPubkey);
const ix = await provider.threadDelete(wallet.publicKey, threadPubkey);
```

Update a Thread

```rust
const ix = await provider.threadUpdate(wallet.publicKey, threadPubkey, {
      name: "TestUpdateThread",
      rateLimit: new BN(32),
      trigger: { now: {} },
});
const tx = new Transaction().add(ix);
const signature = await provider.anchorProvider.sendAndConfirm(tx);
```

Withdraw from Thread

```rust
const ix = await provider.threadWithdraw(
      wallet.publicKey,
      threadPubkey,
      0.01 * LAMPORTS_PER_SOL
);
const tx = new Transaction().add(ix);
const signature = await provider.anchorProvider.sendAndConfirm(tx);
```
