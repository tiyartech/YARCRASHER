import fs from "fs";
import chalk from "chalk";
import { Boom } from "@hapi/boom";
import { DisconnectReason, makeInMemoryStore, fetchLatestBaileysVersion, useMultiFileAuthState } from "@whiskeysockets/baileys";
import pino from "pino";

global.Boom = Boom;
global.chalk = chalk;
global.pino = pino;
global.fs = fs;
global.makeInMemoryStore = makeInMemoryStore;
global.fetchLatestBaileysVersion = fetchLatestBaileysVersion;
global.useMultiFileAuthState = useMultiFileAuthState;
global.DisconnectReason = DisconnectReason;

global.color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

global.success = (id, text) => {
  console.log(chalk.bold.green(`[ ${id} ] SUCCESS > ${text}`));
};
global.start = (id, text) => {
  console.log(chalk.bold.blue(`[ ${id} ] STARTING > ${text}`));
};
