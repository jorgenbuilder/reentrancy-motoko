import { Ed25519KeyIdentity } from "@dfinity/identity";
import { randomUser } from "./tests/common";

const users = new Array(2).fill(Ed25519KeyIdentity.generate()).map(randomUser);

describe("Reentrancy", () => {
  it("proves that state shifts under your feet when using await", async () => {
    await Promise.all(
      Array(100)
        .fill(null)
        .map(() => users[0].call.reentrancy.test())
    ).then(console.log);
  });
});
