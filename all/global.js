import chalk from "chalk"
import { Boom } from "@hapi/boom"

global.Boom = Boom
global.chalk = chalk

console.log(chalk.greenBright("✅ Global loaded"))
