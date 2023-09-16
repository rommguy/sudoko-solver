import chalk from "chalk";

export const logWarn = (text: string) => console.log(chalk.magenta(text));

export const logError = (text: string, additionalInfo?: unknown) =>
  console.log(chalk.red(text), additionalInfo);

export const logInfo = (text: string) => console.log(chalk.green(text));
