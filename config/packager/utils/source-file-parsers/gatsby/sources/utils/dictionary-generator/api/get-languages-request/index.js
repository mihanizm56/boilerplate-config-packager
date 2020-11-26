const { JSONRPCRequest } = require('@mihanizm56/fetch-api');
const Joi = require('@hapi/joi');

module.exports.getLanguagesRequest = () =>
  new JSONRPCRequest().makeRequest({
    extraValidationCallback: () => true,
    endpoint:
      'http://speu-i18n.suppliers-portal-ru.svc.k8s.stage/I18N/getLanguages',
    parseType: 'json',
    responseSchema: Joi.object({
      languages: Joi.array().items(Joi.string().required()),
    }),
    body: { params: { ns: 'root' } },
  });
