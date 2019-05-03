import { config } from '@config/jwt.config';
import * as jwt from 'jsonwebtoken';

export class JwtService {
  public generateToken(body: object): string {
    const token = jwt.sign(body, config.jwtSecret);
    return token;
  }

  public verfiyToken(token: string): object | undefined {
    try {
      token = token.split(' ')[1];
      return jwt.verify(token, config.jwtSecret);
    } catch {
      return undefined;
    }
  }
}
