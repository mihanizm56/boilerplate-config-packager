import Joi from '@hapi/joi';

export const responseSchema = Joi.object({
  results: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
    }),
  ),
});
