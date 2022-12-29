import fs from "fs";
import os from "os";
import path from "path";
import Dotenv from "dotenv";
Dotenv.config();

// const ENV_PATH = path.join(process.env.PWD!, ".env"); // ENV
const ENV_PATH = path.join(".env"); // ENV

export function getChannelIDbyENV(): number | undefined {
  const STORE_NO_END = Number(process.env.STORE_NO_END);
  const SERVER_TOTAL = Number(process.env.SERVER_TOTAL);
  const STORE_NO_START = Number(process.env.STORE_NO_START);

  if (STORE_NO_END < STORE_NO_START) {
    return undefined;
  } else {
    setEnvValue("STORE_NO_START", STORE_NO_START + SERVER_TOTAL);
    return STORE_NO_START;
  }
}

export default function setEnvValue(key: string, value: any) {
  // read file from hdd & split if from a linebreak to a array
  const ENV_VARS = fs.readFileSync(ENV_PATH, "utf8").split(os.EOL);

  const search = ENV_VARS.find((line) => {
    return line.match(new RegExp(key));
  });

  if (search) {
    // find the env we want based on the key
    const target = ENV_VARS.indexOf(search);

    // replace the key/value with the new value
    ENV_VARS.splice(target, 1, `${key}=${value}`);

    // write everything back to the file system
    fs.writeFileSync(ENV_PATH, ENV_VARS.join(os.EOL));
  }
}
