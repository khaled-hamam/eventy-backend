import { createParamDecorator } from '@nestjs/common';

export const UserToken = createParamDecorator((data, req) => {
  return req.user;
});
