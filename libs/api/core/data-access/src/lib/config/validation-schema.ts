import * as Joi from 'joi'

export const validationSchema = Joi.object({
  API_URL: Joi.string().required().error(new Error(`API_URL is required.`)),
  // GitHub Authentication
  AUTH_GITHUB_ADMIN_IDS: Joi.string(),
  AUTH_GITHUB_CLIENT_ID: Joi.string(),
  AUTH_GITHUB_CLIENT_SECRET: Joi.string(),
  AUTH_GITHUB_ENABLED: Joi.boolean().default(true),
  // Username and Password Authentication
  AUTH_PASSWORD_ENABLED: Joi.boolean().default(true),
  AUTH_REGISTER_ENABLED: Joi.boolean().default(true),
  // Cloak
  CLOAK_MASTER_KEY: Joi.string().required().error(new Error(`CLOAK_MASTER_KEY is required.`)),
  CLOAK_KEYCHAIN: Joi.string().required().error(new Error(`CLOAK_KEYCHAIN is required.`)),
  // Cookie
  COOKIE_NAME: Joi.string().default('__session'),
  COOKIE_SECURE: Joi.boolean().default(true),
  // Database
  DATABASE_PROVISION: Joi.boolean().default(false),
  DATABASE_URL: Joi.string(),
  GRAPHQL_PLAYGROUND: Joi.boolean().default(false),
  JWT_SECRET: Joi.string().required(),
  HELIUS_API_KEY: Joi.string().optional(),
  HOST: Joi.string().default('0.0.0.0'),
  NETWORK_CLUSTER_SOLANA_CUSTOM: Joi.string().optional(),
  NETWORK_CLUSTER_SOLANA_DEVNET: Joi.string().optional(),
  NETWORK_CLUSTER_SOLANA_MAINNET: Joi.string().optional(),
  NETWORK_CLUSTER_SOLANA_TESTNET: Joi.string().optional(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
  PORT: Joi.number().default(3000),
  SESSION_SECRET: Joi.string().required(),
  SYNC_DRY_RUN: Joi.boolean().default(false),
})
