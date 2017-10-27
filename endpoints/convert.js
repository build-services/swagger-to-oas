const request = require('r2');
const swagger2openapi = require('swagger2openapi');

/*
 * Convert a Swagger file to an OAS document
 *
 * @param {string} url URL of the Swagger file
 * @throws {ValidationError} Must provide all required fields
 * @throws {RequestError} Cannot fetch Swagger file
 * @throws {ConvertError} There was an error converting your swagger file to OAS
 * @returns {string} The OAS document
 */
module.exports = (data, api) => {
  if (!data.url) return api.error('ValidationError');
  return request.get(data.url).json.then((json) => {
    return swagger2openapi.convertObj(json, {})
      .then(result => api.success(result.openapi))
      .catch(() => api.error('ConvertError'));
  }).catch(() => {
    api.error('RequestError');
  });
};
