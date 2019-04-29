import { config } from '@config/jwt.config';
import * as jwt from 'jsonwebtoken';

export class JwtService {
  public generateToken(body: object) {
    var token = jwt.sign(body, config.jwtSeceret);
    return token;
  }

  public verfiyToken(token: string) {
    try {
      token = token.split(' ')[1];
      return jwt.verify(token, config.jwtSeceret);
    } catch {
      return undefined;
    }
  }
}
