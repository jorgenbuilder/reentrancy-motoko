import { execSync } from "child_process";

async function deploy() {
  execSync(`echo "yes" | dfx deploy`);
}

deploy();
