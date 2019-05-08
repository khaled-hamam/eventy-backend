import { HashingService } from './../../common/services/hashing.service';
import { User } from './user.model';
import { RegisterUserDTO } from './dto/registerUser.dto';
import { LoginUserDTO } from './dto/loginUser.dto';
import { UserRepository } from './user.repository';
import { PlannerRepository } from './planner.repository';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { JwtService } from '@common/services/jwt.service';
import { UserAlreadyExistsException } from '@common/excpetions/user-exists.exceptions';
import { InvalidCredentialsException } from '@common/excpetions/invalid-credentials';
import { EventPlanner } from './planner.model';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly plannerRepository: PlannerRepository,
    private readonly hashing: HashingService,
    private readonly jwt: JwtService,
  ) {}

  @Post('/register')
  async registerUser(@Body() registerUserDto: RegisterUserDTO) {
    const userFound =
      (await this.userRepository.findOne({ username: registerUserDto.username })) ||
      (await this.userRepository.findOne({ email: registerUserDto.email }));
    if (userFound) {
      throw new UserAlreadyExistsException();
    }

    const user = new User(registerUserDto);
    user.password = await this.hashing.hashPassword(user.password);
    await this.userRepository.save(user);

    if (registerUserDto.role === 'planner') {
      const planner = new EventPlanner(registerUserDto);
      await this.plannerRepository.save(planner);
    }
  }

  @Post('/login')
  @HttpCode(200)
  async loginUser(@Body() loginUserDto: LoginUserDTO) {
    const user = await this.userRepository.findOne({ email: loginUserDto.email });
    if (!user) {
      throw new InvalidCredentialsException();
    }

    // compare given pw with hashing pw
    if ((await this.hashing.matchingPassword(loginUserDto.password, user.password)) === false) {
      throw new InvalidCredentialsException();
    }

    // get user role
    const userPlanner = await this.plannerRepository.findOne({ user });
    const body = {
      role: userPlanner ? 'planner' : 'creator',
      username: user.username,
      fullName: user.fullName,
      email: user.email,
    };

    return { token: this.jwt.generateToken(body) };
  }
}
