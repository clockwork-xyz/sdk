export type ThreadProgram = {
  version: "2.0.16";
  name: "thread_program";
  docs: ["Program for creating transaction threads on Solana."];
  instructions: [
    {
      name: "getCrateInfo";
      docs: [
        "Return the crate information via `sol_set_return_data/sol_get_return_data`"
      ];
      accounts: [
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
      returns: {
        defined: "CrateInfo";
      };
    },
    {
      name: "threadExec";
      docs: ["Executes the next instruction on thread."];
      accounts: [
        {
          name: "fee";
          isMut: true;
          isSigner: false;
          docs: ["The worker's fee account."];
        },
        {
          name: "pool";
          isMut: false;
          isSigner: false;
          docs: ["The active worker pool."];
        },
        {
          name: "signatory";
          isMut: true;
          isSigner: true;
          docs: ["The signatory."];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to execute."];
        },
        {
          name: "worker";
          isMut: false;
          isSigner: false;
          docs: ["The worker."];
        }
      ];
      args: [];
    },
    {
      name: "threadCreate";
      docs: ["Creates a new transaction thread."];
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["The authority (owner) of the thread."];
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
          docs: ["The payer for account initializations."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
          docs: ["The Solana system program."];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to be created."];
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "id";
          type: "bytes";
        },
        {
          name: "instructions";
          type: {
            vec: {
              defined: "SerializableInstruction";
            };
          };
        },
        {
          name: "trigger";
          type: {
            defined: "Trigger";
          };
        }
      ];
    },
    {
      name: "threadDelete";
      docs: [
        "Closes an existing thread account and returns the lamports to the owner."
      ];
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["The authority (owner) of the thread."];
        },
        {
          name: "closeTo";
          isMut: true;
          isSigner: false;
          docs: ["The address to return the data rent lamports to."];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to be delete."];
        }
      ];
      args: [];
    },
    {
      name: "threadInstructionAdd";
      docs: ["Appends a new instruction to the thread's instruction set."];
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
          docs: ["The authority (owner) of the thread."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
          docs: ["The Solana system program"];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to be paused."];
        }
      ];
      args: [
        {
          name: "instruction";
          type: {
            defined: "SerializableInstruction";
          };
        }
      ];
    },
    {
      name: "threadInstructionRemove";
      docs: [
        "Removes an instruction to the thread's instruction set at the provied index."
      ];
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["The authority (owner) of the thread."];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to be edited."];
        }
      ];
      args: [
        {
          name: "index";
          type: "u64";
        }
      ];
    },
    {
      name: "threadKickoff";
      docs: ["Kicks off a thread if its trigger condition is active."];
      accounts: [
        {
          name: "signatory";
          isMut: true;
          isSigner: true;
          docs: ["The signatory."];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to kickoff."];
        },
        {
          name: "worker";
          isMut: false;
          isSigner: false;
          docs: ["The worker."];
        }
      ];
      args: [];
    },
    {
      name: "threadPause";
      docs: ["Pauses an active thread."];
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["The authority (owner) of the thread."];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to be paused."];
        }
      ];
      args: [];
    },
    {
      name: "threadResume";
      docs: ["Resumes a paused thread."];
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["The authority (owner) of the thread."];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to be resumed."];
        }
      ];
      args: [];
    },
    {
      name: "threadReset";
      docs: ["Resets a thread's next instruction."];
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["The authority (owner) of the thread."];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to be paused."];
        }
      ];
      args: [];
    },
    {
      name: "threadUpdate";
      docs: ["Allows an owner to update the mutable properties of a thread."];
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
          docs: ["The authority (owner) of the thread."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
          docs: ["The Solana system program"];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to be updated."];
        }
      ];
      args: [
        {
          name: "settings";
          type: {
            defined: "ThreadSettings";
          };
        }
      ];
    },
    {
      name: "threadWithdraw";
      docs: ["Allows an owner to withdraw from a thread's lamport balance."];
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
          docs: ["The authority (owner) of the thread."];
        },
        {
          name: "payTo";
          isMut: true;
          isSigner: false;
          docs: ["The account to withdraw lamports to."];
        },
        {
          name: "thread";
          isMut: true;
          isSigner: false;
          docs: ["The thread to be."];
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "thread";
      docs: ["Tracks the current state of a transaction thread on Solana."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            docs: ["The owner of this thread."];
            type: "publicKey";
          },
          {
            name: "bump";
            docs: ["The bump, used for PDA validation."];
            type: "u8";
          },
          {
            name: "createdAt";
            docs: ["The cluster clock at the moment the thread was created."];
            type: {
              defined: "ClockData";
            };
          },
          {
            name: "execContext";
            docs: ["The context of the thread's current execution state."];
            type: {
              option: {
                defined: "ExecContext";
              };
            };
          },
          {
            name: "fee";
            docs: [
              "The number of lamports to payout to workers per execution."
            ];
            type: "u64";
          },
          {
            name: "id";
            docs: ["The id of the thread, given by the authority."];
            type: "bytes";
          },
          {
            name: "instructions";
            docs: ["The instructions to be executed."];
            type: {
              vec: {
                defined: "SerializableInstruction";
              };
            };
          },
          {
            name: "name";
            docs: ["The name of the thread."];
            type: "string";
          },
          {
            name: "nextInstruction";
            docs: ["The next instruction to be executed."];
            type: {
              option: {
                defined: "SerializableInstruction";
              };
            };
          },
          {
            name: "paused";
            docs: ["Whether or not the thread is currently paused."];
            type: "bool";
          },
          {
            name: "rateLimit";
            docs: ["The maximum number of execs allowed per slot."];
            type: "u64";
          },
          {
            name: "trigger";
            docs: ["The triggering event to kickoff a thread."];
            type: {
              defined: "Trigger";
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "Trigger";
      docs: ["Trigger"];
      type: {
        kind: "enum";
        variants: [
          {
            name: "Account";
            fields: [
              {
                name: "address";
                docs: ["The address of the account to monitor"];
                type: "publicKey";
              },
              {
                name: "offset";
                docs: ["The byte offset of the account data to monitor"];
                type: "u64";
              },
              {
                name: "size";
                docs: [
                  "The size of the byte slice to monitor (must be less than 1kb)"
                ];
                type: "u64";
              }
            ];
          },
          {
            name: "Cron";
            fields: [
              {
                name: "schedule";
                docs: [
                  "The schedule in cron syntax. Value must be parsable by the `clockwork_cron` package"
                ];
                type: "string";
              },
              {
                name: "skippable";
                docs: [
                  "Boolean value indicating whether triggering moments may be skipped if they are missed (e.g. due to network downtime) If false, any missed triggering moments will simply be executed as soon as the network comes back online."
                ];
                type: "bool";
              }
            ];
          },
          {
            name: "Now";
          },
          {
            name: "Slot";
            fields: [
              {
                name: "slot";
                docs: ["Slot"];
                type: "u64";
              }
            ];
          },
          {
            name: "Epoch";
            fields: [
              {
                name: "epoch";
                docs: ["Epoch"];
                type: "u64";
              }
            ];
          },
          {
            name: "Timestamp";
            fields: [
              {
                name: "unix_ts";
                docs: ["Unix timestamp"];
                type: "i64";
              }
            ];
          },
          {
            name: "Pyth";
            fields: [
              {
                name: "price_feed";
                docs: ["Price feed"];
                type: "publicKey";
              },
              {
                name: "equality";
                docs: ["Equality"];
                type: { defined: "Equality" }
              },
              {
                name: "limit";
                docs: ["Limit"];
                type: "i64";
              },
            ];
          }
        ];
      };
    },
    {
      name: "SerializableInstruction";
      docs: ["Serializable Instruction"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "programId";
            docs: [
              "Pubkey of the instruction processor that executes this instruction"
            ];
            type: "publicKey";
          },
          {
            name: "accounts";
            docs: [
              "Metadata for what accounts should be passed to the instruction processor"
            ];
            type: {
              vec: { defined: "SerializableAccount" };
            };
          },
          {
            name: "data";
            docs: ["Opaque data passed to the instruction processor"];
            type: "bytes";
          }
        ];
      };
    },
    {
      name: "SerializableAccount";
      docs: ["Serializable Account"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "pubkey";
            docs: ["An account's public key"];
            type: "publicKey";
          },
          {
            name: "isSigner";
            docs: [
              "True if an Instruction requires a Transaction signature matching `pubkey`"
            ];
            type: "bool";
          },
          {
            name: "isWritable";
            docs: [
              "True if the `pubkey` can be loaded as a read-write account"
            ];
            type: "bool";
          }
        ];
      };
    },
    {
      name: "ClockData";
      docs: ["Clock Data"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "slot";
            docs: ["The Current Slot"];
            type: "u64";
          },
          {
            name: "epoch";
            docs: ["The Bank Epoch"];
            type: "u64";
          },
          {
            name: "unixTimestamp";
            docs: ["The Current Unix Timestamp"];
            type: "i64";
          }
        ];
      };
    },
    {
      name: "ExecContext";
      docs: ["The execution context of a particular transaction thread."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "execIndex";
            docs: ["Index of the next instruction to be executed."];
            type: "u64";
          },
          {
            name: "execsSinceReimbursement";
            docs: ["Number of execs since the last tx reimbursement."];
            type: "u64";
          },
          {
            name: "execsSinceSlot";
            docs: ["Number of execs in this slot."];
            type: "u64";
          },
          {
            name: "lastExecAt";
            docs: ["Slot of the last exec"];
            type: "u64";
          },
          {
            name: "triggerContext";
            docs: ["Context for the triggering condition"];
            type: {
              defined: "TriggerContext";
            };
          }
        ];
      };
    },
    {
      name: "ThreadSettings";
      docs: ["The properties of threads which are updatable."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "fee";
            type: {
              option: "u64";
            };
          },
          {
            name: "instructions";
            type: {
              option: {
                vec: {
                  defined: "SerializableInstruction";
                };
              };
            };
          },
          {
            name: "name";
            type: {
              option: "string";
            };
          },
          {
            name: "rateLimit";
            type: {
              option: "u64";
            };
          },
          {
            name: "trigger";
            type: {
              option: {
                defined: "Trigger";
              };
            };
          }
        ];
      };
    },
    {
      name: "TriggerContext";
      docs: [
        "The event which allowed a particular transaction thread to be triggered."
      ];
      type: {
        kind: "enum";
        variants: [
          {
            name: "Account";
            fields: [
              {
                name: "data_hash";
                docs: ["The account's data hash."];
                type: "u64";
              }
            ];
          },
          {
            name: "Cron";
            fields: [
              {
                name: "started_at";
                docs: ["The threshold moment the schedule was waiting for."];
                type: "i64";
              }
            ];
          },
          {
            name: "Now";
          },
          {
            name: "Slot";
            fields: [
              {
                name: "started_at";
                docs: ["The threshold slot the schedule was waiting for."];
                type: "u64";
              }
            ];
          },
          {
            name: "Epoch";
            fields: [
              {
                name: "started_at";
                docs: ["The threshold epoch the schedule was waiting for."];
                type: "u64";
              }
            ];
          },
          {
            name: "Timestamp",
            fields: [
              {
                name: "started_at",
                docs: [
                  "The threshold moment the schedule was waiting for."
                ],
                type: "i64"
              }
            ]
          },
          {
            name: "Pyth",
            fields: [
              {
                name: "price",
                docs: [
                  "The limit price the trigger was waiting for."
                ],
                type: "i64"
              }
            ]
          }
        ];
      };
    },
    {
      name: "Equality";
      docs: ["Equality"];
      type: {
        kind: "enum";
        variants: [
          {
            name: "GreaterThanOrEqual";
          },
          {
            name: "LessThanOrEqual";
          }
        ];
      };
    } 
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidThreadResponse";
      msg: "The exec response could not be parsed";
    },
    {
      code: 6001;
      name: "InvalidThreadState";
      msg: "The thread is in an invalid state";
    },
    {
      code: 6002;
      name: "InvalidTriggerVariant";
      msg: "The trigger variant cannot be changed";
    },
    {
      code: 6003;
      name: "TriggerNotActive";
      msg: "The trigger condition has not been activated";
    },
    {
      code: 6004;
      name: "ThreadBusy";
      msg: "This operation cannot be processes because the thread is currently busy";
    },
    {
      code: 6005;
      name: "ThreadPaused";
      msg: "The thread is currently paused";
    },
    {
      code: 6006;
      name: "RateLimitExeceeded";
      msg: "The thread's rate limit has been reached";
    },
    {
      code: 6007;
      name: "MaxRateLimitExceeded";
      msg: "Thread rate limits cannot exceed the maximum allowed value";
    },
    {
      code: 6008;
      name: "UnauthorizedWrite";
      msg: "Inner instruction attempted to write to an unauthorized address";
    },
    {
      code: 6009;
      name: "WithdrawalTooLarge";
      msg: "Withdrawing this amount would leave the thread with less than the minimum required SOL for rent exemption";
    }
  ];
};

export const IDL: ThreadProgram = {
  version: "2.0.16",
  name: "thread_program",
  docs: ["Program for creating transaction threads on Solana."],
  instructions: [
    {
      name: "getCrateInfo",
      docs: [
        "Return the crate information via `sol_set_return_data/sol_get_return_data`",
      ],
      accounts: [
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      returns: {
        defined: "CrateInfo",
      },
    },
    {
      name: "threadExec",
      docs: ["Executes the next instruction on thread."],
      accounts: [
        {
          name: "fee",
          isMut: true,
          isSigner: false,
          docs: ["The worker's fee account."],
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
          docs: ["The active worker pool."],
        },
        {
          name: "signatory",
          isMut: true,
          isSigner: true,
          docs: ["The signatory."],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to execute."],
        },
        {
          name: "worker",
          isMut: false,
          isSigner: false,
          docs: ["The worker."],
        },
      ],
      args: [],
    },
    {
      name: "threadCreate",
      docs: ["Creates a new transaction thread."],
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["The authority (owner) of the thread."],
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          docs: ["The payer for account initializations."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          docs: ["The Solana system program."],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to be created."],
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "id",
          type: "bytes",
        },
        {
          name: "instructions",
          type: {
            vec: {
              defined: "SerializableInstruction",
            },
          },
        },
        {
          name: "trigger",
          type: {
            defined: "Trigger",
          },
        },
      ],
    },
    {
      name: "threadDelete",
      docs: [
        "Closes an existing thread account and returns the lamports to the owner.",
      ],
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["The authority (owner) of the thread."],
        },
        {
          name: "closeTo",
          isMut: true,
          isSigner: false,
          docs: ["The address to return the data rent lamports to."],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to be delete."],
        },
      ],
      args: [],
    },
    {
      name: "threadInstructionAdd",
      docs: ["Appends a new instruction to the thread's instruction set."],
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
          docs: ["The authority (owner) of the thread."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          docs: ["The Solana system program"],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to be paused."],
        },
      ],
      args: [
        {
          name: "instruction",
          type: {
            defined: "SerializableInstruction",
          },
        },
      ],
    },
    {
      name: "threadInstructionRemove",
      docs: [
        "Removes an instruction to the thread's instruction set at the provied index.",
      ],
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["The authority (owner) of the thread."],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to be edited."],
        },
      ],
      args: [
        {
          name: "index",
          type: "u64",
        },
      ],
    },
    {
      name: "threadKickoff",
      docs: ["Kicks off a thread if its trigger condition is active."],
      accounts: [
        {
          name: "signatory",
          isMut: true,
          isSigner: true,
          docs: ["The signatory."],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to kickoff."],
        },
        {
          name: "worker",
          isMut: false,
          isSigner: false,
          docs: ["The worker."],
        },
      ],
      args: [],
    },
    {
      name: "threadPause",
      docs: ["Pauses an active thread."],
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["The authority (owner) of the thread."],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to be paused."],
        },
      ],
      args: [],
    },
    {
      name: "threadResume",
      docs: ["Resumes a paused thread."],
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["The authority (owner) of the thread."],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to be resumed."],
        },
      ],
      args: [],
    },
    {
      name: "threadReset",
      docs: ["Resets a thread's next instruction."],
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["The authority (owner) of the thread."],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to be paused."],
        },
      ],
      args: [],
    },
    {
      name: "threadUpdate",
      docs: ["Allows an owner to update the mutable properties of a thread."],
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
          docs: ["The authority (owner) of the thread."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          docs: ["The Solana system program"],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to be updated."],
        },
      ],
      args: [
        {
          name: "settings",
          type: {
            defined: "ThreadSettings",
          },
        },
      ],
    },
    {
      name: "threadWithdraw",
      docs: ["Allows an owner to withdraw from a thread's lamport balance."],
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
          docs: ["The authority (owner) of the thread."],
        },
        {
          name: "payTo",
          isMut: true,
          isSigner: false,
          docs: ["The account to withdraw lamports to."],
        },
        {
          name: "thread",
          isMut: true,
          isSigner: false,
          docs: ["The thread to be."],
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "thread",
      docs: ["Tracks the current state of a transaction thread on Solana."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            docs: ["The owner of this thread."],
            type: "publicKey",
          },
          {
            name: "bump",
            docs: ["The bump, used for PDA validation."],
            type: "u8",
          },
          {
            name: "createdAt",
            docs: ["The cluster clock at the moment the thread was created."],
            type: {
              defined: "ClockData",
            },
          },
          {
            name: "execContext",
            docs: ["The context of the thread's current execution state."],
            type: {
              option: {
                defined: "ExecContext",
              },
            },
          },
          {
            name: "fee",
            docs: [
              "The number of lamports to payout to workers per execution.",
            ],
            type: "u64",
          },
          {
            name: "id",
            docs: ["The id of the thread, given by the authority."],
            type: "bytes",
          },
          {
            name: "instructions",
            docs: ["The instructions to be executed."],
            type: {
              vec: {
                defined: "SerializableInstruction",
              },
            },
          },
          {
            name: "name",
            docs: ["The name of the thread."],
            type: "string",
          },
          {
            name: "nextInstruction",
            docs: ["The next instruction to be executed."],
            type: {
              option: {
                defined: "SerializableInstruction",
              },
            },
          },
          {
            name: "paused",
            docs: ["Whether or not the thread is currently paused."],
            type: "bool",
          },
          {
            name: "rateLimit",
            docs: ["The maximum number of execs allowed per slot."],
            type: "u64",
          },
          {
            name: "trigger",
            docs: ["The triggering event to kickoff a thread."],
            type: {
              defined: "Trigger",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "Trigger",
      docs: ["Trigger"],
      type: {
        kind: "enum",
        variants: [
          {
            name: "Account",
            fields: [
              {
                name: "address",
                docs: ["The address of the account to monitor"],
                type: "publicKey",
              },
              {
                name: "offset",
                docs: ["The byte offset of the account data to monitor"],
                type: "u64",
              },
              {
                name: "size",
                docs: [
                  "The size of the byte slice to monitor (must be less than 1kb)",
                ],
                type: "u64",
              },
            ],
          },
          {
            name: "Cron",
            fields: [
              {
                name: "schedule",
                docs: [
                  "The schedule in cron syntax. Value must be parsable by the `clockwork_cron` package",
                ],
                type: "string",
              },
              {
                name: "skippable",
                docs: [
                  "Boolean value indicating whether triggering moments may be skipped if they are missed (e.g. due to network downtime) If false, any missed triggering moments will simply be executed as soon as the network comes back online.",
                ],
                type: "bool",
              },
            ],
          },
          {
            name: "Now",
          },
          {
            name: "Slot",
            fields: [
              {
                name: "slot",
                docs: ["Slot"],
                type: "u64",
              },
            ],
          },
          {
            name: "Epoch",
            fields: [
              {
                name: "epoch",
                docs: ["Epoch"],
                type: "u64",
              },
            ],
          },
          {
            name: "Timestamp",
            fields: [
              {
                name: "unix_ts",
                docs: ["Unix timestamp"],
                type: "i64",
              },
            ],
          },
          {
            name: "Pyth",
            fields: [
              {
                name: "price_feed",
                docs: ["Price feed"],
                type: "publicKey",
              },
              {
                name: "equality",
                docs: ["Equality"],
                type: { defined: "Equality" }
              },
              {
                name: "limit",
                docs: ["Limit"],
                type: "i64",
              },
            ],
          }
        ],
      },
    },
    {
      name: "SerializableInstruction",
      docs: ["Serializable Instruction"],
      type: {
        kind: "struct",
        fields: [
          {
            name: "programId",
            docs: [
              "Pubkey of the instruction processor that executes this instruction",
            ],
            type: "publicKey",
          },
          {
            name: "accounts",
            docs: [
              "Metadata for what accounts should be passed to the instruction processor",
            ],
            type: {
              vec: { defined: "SerializableAccount" },
            },
          },
          {
            name: "data",
            docs: ["Opaque data passed to the instruction processor"],
            type: "bytes",
          },
        ],
      },
    },
    {
      name: "SerializableAccount",
      docs: ["Serializable Account"],
      type: {
        kind: "struct",
        fields: [
          {
            name: "pubkey",
            docs: ["An account's public key"],
            type: "publicKey",
          },
          {
            name: "isSigner",
            docs: [
              "True if an Instruction requires a Transaction signature matching `pubkey`",
            ],
            type: "bool",
          },
          {
            name: "isWritable",
            docs: [
              "True if the `pubkey` can be loaded as a read-write account",
            ],
            type: "bool",
          },
        ],
      },
    },
    {
      name: "ClockData",
      docs: ["Clock Data"],
      type: {
        kind: "struct",
        fields: [
          {
            name: "slot",
            docs: ["The Current Slot"],
            type: "u64",
          },
          {
            name: "epoch",
            docs: ["The Bank Epoch"],
            type: "u64",
          },
          {
            name: "unixTimestamp",
            docs: ["The Current Unix Timestamp"],
            type: "i64",
          },
        ],
      },
    },
    {
      name: "ExecContext",
      docs: ["The execution context of a particular transaction thread."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "execIndex",
            docs: ["Index of the next instruction to be executed."],
            type: "u64",
          },
          {
            name: "execsSinceReimbursement",
            docs: ["Number of execs since the last tx reimbursement."],
            type: "u64",
          },
          {
            name: "execsSinceSlot",
            docs: ["Number of execs in this slot."],
            type: "u64",
          },
          {
            name: "lastExecAt",
            docs: ["Slot of the last exec"],
            type: "u64",
          },
          {
            name: "triggerContext",
            docs: ["Context for the triggering condition"],
            type: {
              defined: "TriggerContext",
            },
          },
        ],
      },
    },
    {
      name: "ThreadSettings",
      docs: ["The properties of threads which are updatable."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "fee",
            type: {
              option: "u64",
            },
          },
          {
            name: "instructions",
            type: {
              option: {
                vec: {
                  defined: "SerializableInstruction",
                },
              },
            },
          },
          {
            name: "name",
            type: {
              option: "string",
            },
          },
          {
            name: "rateLimit",
            type: {
              option: "u64",
            },
          },
          {
            name: "trigger",
            type: {
              option: {
                defined: "Trigger",
              },
            },
          },
        ],
      },
    },
    {
      name: "TriggerContext",
      docs: [
        "The event which allowed a particular transaction thread to be triggered.",
      ],
      type: {
        kind: "enum",
        variants: [
          {
            name: "Account",
            fields: [
              {
                name: "data_hash",
                docs: ["The account's data hash."],
                type: "u64",
              },
            ],
          },
          {
            name: "Cron",
            fields: [
              {
                name: "started_at",
                docs: ["The threshold moment the schedule was waiting for."],
                type: "i64",
              },
            ],
          },
          {
            name: "Now",
          },
          {
            name: "Slot",
            fields: [
              {
                name: "started_at",
                docs: ["The threshold slot the schedule was waiting for."],
                type: "u64",
              },
            ],
          },
          {
            name: "Epoch",
            fields: [
              {
                name: "started_at",
                docs: ["The threshold epoch the schedule was waiting for."],
                type: "u64",
              },
            ],
          },
          {
            name: "Timestamp",
            fields: [
              {
                name: "started_at",
                docs: [
                  "The threshold moment the schedule was waiting for."
                ],
                type: "i64"
              }
            ]
          },
          {
            name: "Pyth",
            fields: [
              {
                name: "price",
                docs: [
                  "The limit price the trigger was waiting for."
                ],
                type: "i64"
              }
            ]
          }
        ],
      },
    },
    {
      name: "Equality",
      docs: ["Equality"],
      type: {
        kind: "enum",
        variants: [
          {
            name: "GreaterThanOrEqual"
          },
          {
            name: "LessThanOrEqual"
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidThreadResponse",
      msg: "The exec response could not be parsed",
    },
    {
      code: 6001,
      name: "InvalidThreadState",
      msg: "The thread is in an invalid state",
    },
    {
      code: 6002,
      name: "InvalidTriggerVariant",
      msg: "The trigger variant cannot be changed",
    },
    {
      code: 6003,
      name: "TriggerNotActive",
      msg: "The trigger condition has not been activated",
    },
    {
      code: 6004,
      name: "ThreadBusy",
      msg: "This operation cannot be processes because the thread is currently busy",
    },
    {
      code: 6005,
      name: "ThreadPaused",
      msg: "The thread is currently paused",
    },
    {
      code: 6006,
      name: "RateLimitExeceeded",
      msg: "The thread's rate limit has been reached",
    },
    {
      code: 6007,
      name: "MaxRateLimitExceeded",
      msg: "Thread rate limits cannot exceed the maximum allowed value",
    },
    {
      code: 6008,
      name: "UnauthorizedWrite",
      msg: "Inner instruction attempted to write to an unauthorized address",
    },
    {
      code: 6009,
      name: "WithdrawalTooLarge",
      msg: "Withdrawing this amount would leave the thread with less than the minimum required SOL for rent exemption",
    },
  ],
};
