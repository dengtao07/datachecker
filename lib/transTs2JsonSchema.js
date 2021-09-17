const TJS = require('typescript-json-schema');
const fs = require('fs');
const { schemaId } = require('./constants');

function transTs2JsonSchema(sourcePath, targetPath) {
  // optionally pass argument to schema generator
  const settings = {
    required: true,
  };

  // optionally pass ts compiler options
  const compilerOptions = {
    strictNullChecks: true,
  };

  const program = TJS.getProgramFromFiles(
    [sourcePath],
    compilerOptions,
  );

  // iterate all the api interfaces，transfer those to json-schema
  const schema = TJS.generateSchema(program, '*', settings) || {};
  schema.$id = schemaId;

  // format json
  const newSchema = JSON.stringify(schema, null, 2);

  fs.writeFileSync(targetPath, newSchema);
}

module.exports = transTs2JsonSchema;
