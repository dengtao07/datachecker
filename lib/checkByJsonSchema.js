const path = require('path');
const { Validator } = require('jsonschema');
const { schemaId } = require('./constants');

function checkByJsonSchema(sourcePath, data, interfaceName) {
  const apiSchema = require(path.join(sourcePath));
  const v = new Validator();
  v.addSchema(apiSchema, schemaId);
  return v.validate(data, { $ref: `${schemaId}#/definitions/${interfaceName}` });
}

module.exports = checkByJsonSchema;
