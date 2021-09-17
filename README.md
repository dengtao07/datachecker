## runtime-data-checker
根据接口的 TypeScript 类型定义，在运行时校验后端返回数据的格式正确性

## 原理
将 TypeScript 的类型定义转为 JSON Schema，再使用 JSON Schema 对数据进行格式校验

## useage
1. install
```
npm i runtime-data-checker -S
```

2. 工程下创建类型定义文件
`src/apis/index.ts`

```javascript
// index.ts
interface IApi {
  name: string;
  age: number;
  hobby: string[];
}
```

3. 使用 runtime-data-checker cli命令将步骤 2 中 `index.ts` 转为 JSON Schema
```
runtime-data-checker -p s='类型文件路径'#t='JSON Schema存放路径'
```
例如：
```
runtime-data-checker -p s=apis/index.ts#t=apis/schema.json
```
对应的 JSON Schema 将保存在 `src/apis/schema.json` 中

4. 使用 JSON Schema 校验数据正确性
```javascript
const path = require('path');
const { checkByJsonSchema } = require('runtime-data-checker');

const Api = async () => Promise.resolve({
  name: 'test',
  age: 1,
  hobby: ['coding'],
});

Api().then((res) => {
  const res = checkByJsonSchema(path.join(__dirname, './apis/schema.json'), res, 'IApi');
  console.log(res);
});
```
其中 `checkByJsonSchema` 校验函数，使用方式：
```javascript
checkByJsonSchema(path, data, apiTypeName)
```
参数：
- `path`(string)：JSON Schema 文件路径
- `data`(object)：接口返回数据
- `apiTypeName`(string)：接口返回值类型名


