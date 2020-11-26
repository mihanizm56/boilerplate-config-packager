const { PureRestRequest } = require('@mihanizm56/fetch-api');
const Joi = require('@hapi/joi');

module.exports.i18nextRequest = (language) =>
  new PureRestRequest().getRequest({
    extraValidationCallback: () => true,
    endpoint: `http://speu-i18n.suppliers-portal-ru.svc.k8s.stage/I18N/wb-eu-passport/${language}/i18next`,
    parseType: 'json',
    responseSchema: Joi.object({
      translate: Joi.object(),
    }),
  });
