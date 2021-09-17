1. 支持commonjs 记忆esm两种引用方式
import dataChecker from 'data-checker'
const dataChecker = require('data-checker')

2. 工程下写好ts类型定义文件 index.ts
/src/model/index.ts

3. 调用方式有两种：
第一种：将ts定义文件的路径和数据传入，库将ts转为jsonSchema后再校验返回结果
优点：对工程和代码的入侵小
缺点：因为要转jsonSchema，速度可能较慢
const res = dataChecker.checkByTs(path, data);

第二种：将jsonSchema文件路径传入和数据传入，库将直接读取jsonSchema进行校验
另外需要在工程上配合，比如每次提交代码的时候将ts转为jsonSchema并写文件
那么除了提供库函数，还需要提供npm cli指令，以便写script命令，比如："trans": "dataChecker -p=src/model/index.ts"
再配合husky和lint-staged，在index.ts有变更的情况下，调用trans命令
优点：校验速度快，转换得到的jsonSchema可反复使用
缺点：工程上改动较多，入侵大
const res = dataChecker.checkByJsonSchema(path, data)