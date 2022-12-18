import { ActorSubclass } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { reentrancyActor } from "./lib/actors";
import { fetchIdentity } from "./lib/keys/index";
import { _SERVICE as Reentrancy } from "./declarations/reentrancy/reentrancy.did.d";

export interface User {
  key: Ed25519KeyIdentity;
  call: {
    reentrancy: ActorSubclass<Reentrancy>;
  };
}

const adminKey = fetchIdentity("admin");
export const admin: User = {
  key: fetchIdentity("admin"),
  call: {
    reentrancy: reentrancyActor(adminKey),
  },
};

export function randomUser(): User {
  const key = Ed25519KeyIdentity.generate();
  return {
    key,
    call: {
      reentrancy: reentrancyActor(key),
    },
  };
}
