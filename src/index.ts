import * as envs from "./config";
import { checkEnv } from "./utils/checkEnv";

checkEnv(Object.keys(envs));

async function main() {
  console.log("Hello World!");
}

main();
