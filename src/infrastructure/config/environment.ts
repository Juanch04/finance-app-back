/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
export = (() => {
  const environment = {
    port: process.env.PORT ?? 4000,
    jwtSecretKey: process.env.JWT_SECRET_KEY ?? 'JWT_SECRET_KEY',
    jwtExpireTime: process.env.JWT_EXPIRE_TIME ?? '15m'
  }

  //   if (process.env.NODE_ENV === 'test') {
  //     environment.database = {
  //       driver: constants.SUPPORTED_DATABASE.IN_MEMORY
  //     }
  //   }

  return environment
})()
