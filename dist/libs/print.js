import chalk from "chalk";
import dayjs from "dayjs";
export function printLog(str) {
    const currentTime = dayjs().format("YY/MM/DD HH:mm:ss:SSS");
    console.log(`${chalk.inverse("[LOG]")}\t${chalk.gray(currentTime)} ${chalk.whiteBright(str)}`);
}
export function printInfo(str) {
    const currentTime = dayjs().format("YY/MM/DD HH:mm:ss:SSS");
    console.log(`${chalk.blue.inverse("[INFO]")}\t${chalk.gray(currentTime)} ${chalk.blueBright(str)}`);
}
export function printError(str) {
    const currentTime = dayjs().format("YY/MM/DD HH:mm:ss:SSS");
    console.log(`${chalk.redBright.inverse("[ERROR]")}\t${chalk.gray(currentTime)} ${chalk.redBright(str)}`);
}
export function printYellow(str) {
    const currentTime = dayjs().format("YY/MM/DD HH:mm:ss:SSS");
    console.log(`${chalk.yellowBright.inverse("[LOG]")}\t${chalk.gray(currentTime)} ${chalk.yellowBright(str)}`);
}
