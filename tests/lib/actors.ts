import { readFileSync } from "fs";
import {
  Actor,
  ActorSubclass,
  HttpAgent,
  HttpAgentOptions,
} from "@dfinity/agent";
import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { _SERVICE as Reentrancy } from "../declarations/reentrancy/reentrancy.did.d";
import { idlFactory as ReentrancyIDL } from "../declarations/reentrancy/reentrancy.did";
import { Identity } from "../../node_modules/@dfinity/agent/lib/cjs/auth";

export const canistersLocal = JSON.parse(
  readFileSync(`${__dirname}/../../.dfx/local/canister_ids.json`).toString()
);

global.fetch = fetch;

// export const canistersProd = JSON.parse(
//   readFileSync(`${__dirname}/../../canister_ids.json`).toString()
// );

export function createActor<T>(
  canisterId: string | Principal,
  idlFactory: IDL.InterfaceFactory,
  options: HttpAgentOptions
): ActorSubclass<T> {
  const agent = new HttpAgent({
    host: process.env.HOST,
    ...options,
  });

  agent.fetchRootKey().catch((err) => {
    console.warn(
      "Unable to fetch root key. Check to ensure that your local replica is running"
    );
    console.error(err);
  });

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
}

const host = "http://127.0.0.1:4943/";

export const reentrancyActor = (identity: Identity) =>
  createActor<Reentrancy>(canistersLocal.reentrancy.local, ReentrancyIDL, {
    identity,
    host,
  });
