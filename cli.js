#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const transTs2JsonSchema = require('./lib/transTs2JsonSchema');

const program = new commander.Command();
program
  .version('0.1.0', '-v, --version')
  .option('-p, --param <path>', 'transform');
program.parse(process.argv);
const options = program.opts();
const { param } = options;
if (param) {
  const paramReg = /s=.+#t=.+/;
  if (!paramReg.test(param)) {
    console.log(chalk.red("【datachecker】- 🤔 参数格式不正确，正确格式为: datachecker -p s='xxx'#t='xxx'"));
    return false;
  }
  const pathStr = param.split('#');
  const sourcePath = pathStr[0].split('=')[1];
  const targetPath = pathStr[1].split('=')[1];
  transTs2JsonSchema(sourcePath, targetPath);
} else {
  console.log('need param -p');
}
