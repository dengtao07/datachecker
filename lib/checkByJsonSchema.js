const { Validator } = require('jsonschema');
const { schemaId } = require('./constants');

function checkByJsonSchema(path, data, interfaceName) {
  const apiSchema = require(path);
  const v = new Validator();
  v.addSchema(apiSchema, schemaId);
  return v.validate(data, { $ref: `${schemaId}#/definitions/${interfaceName}` });
}

module.exports = checkByJsonSchema;
