import { type JwtPayload } from 'jsonwebtoken'

interface TokenManager {
  encode: (value: string) => string
  decode: (value: string) => string | JwtPayload
}

export default TokenManager
