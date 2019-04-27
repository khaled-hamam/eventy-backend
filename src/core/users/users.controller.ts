import { HashingService } from './../../common/services/hashing.service';
import { User } from './user.model';
import { IRegisterUserDto } from './dto/registerUser.dto';
import { ILoginUserDto } from './dto/loginUser.dto';
import { UserRepository } from './user.repository';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly userRepository: UserRepository,
        private readonly hashing: HashingService) { }

    @Post('/register')
    async registerUser(@Body() registerUserDto: IRegisterUserDto) {
        // TODO: Validation
        let user = new User(registerUserDto);

        user.password = await this.hashing.hashPassword(user.password);
        await this.userRepository.save(user);
        response.status(201);
    }

    @Post('/login')
    async loginUser(@Body() loginUserDto: ILoginUserDto) {
        //TODO: Validation
        let user = await this.userRepository.findOne({ email: loginUserDto.email });

        if (user.email == undefined) {
            //TODO: log error
            return response.status(400);
        }

        //compare given pw with hashing pw
        if (await this.hashing.matchingPassword(loginUserDto.password, user.password) === false) {
            //TODO: log error
            return response.status(400);
        }

    }
    //TODO: Generate Token
}
