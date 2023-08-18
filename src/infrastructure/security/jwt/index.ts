import jwt, { type JwtPayload } from 'jsonwebtoken'
import type TokenManager from '@application/security/jwt'
import env from '@infrastructure/config/environment'

class JSONWebTokenManager implements TokenManager {
  private readonly jwt
  private readonly jwtSecretKey: string
  private readonly jwtExpireTime: string

  constructor() {
    this.jwt = jwt
    this.jwtSecretKey = env.jwtSecretKey
    this.jwtExpireTime = env.jwtExpireTime
  }

  public encode(payload: string | object | Buffer): string {
    return this.jwt.sign(payload, this.jwtSecretKey, {
      expiresIn: this.jwtExpireTime,
      algorithm: 'HS256'
    })
  }

  public decode(accessToken: string): string | JwtPayload {
    return this.jwt.verify(accessToken, this.jwtSecretKey)
  }
}

export default JSONWebTokenManager
