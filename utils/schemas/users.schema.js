const joi = require('joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = joi.string().max(100);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string().min(8);
const userIsAdminSchema = joi.boolean();
const apiKeyToken = joi.string();

const userSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
};

const createUserSchema = {
  ...userSchema,
  isAdmin: userIsAdminSchema,
};

const createProviderUserSchema = {
  ...userSchema,
  apiKeyToken: apiKeyToken.required(),
};

const updateUserSchema = {
  name: userNameSchema,
  email: userEmailSchema,
  password: userPasswordSchema,
  isAdmin: userIsAdminSchema,
};

module.exports = {
  userIdSchema,
  createUserSchema,
  createProviderUserSchema,
  updateUserSchema,
};
