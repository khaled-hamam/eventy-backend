<<<<<<< Updated upstream
import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {}
=======
import { User } from './user.model';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserRepository } from './user.repository';
import { LoginUserDto } from './dto/loginUser.dto';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly userRepository: UserRepository) { }

    @Post('/register')
    async registerUser(@Body() registerUserDto: RegisterUserDto) {
        // TODO: Validation
        let user = new User(registerUserDto);
        //TODO: Hashing Password
        await this.userRepository.save(user);
        response.status(201);
    }

    @Post('/login')
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        //TODO: Validation
        let user = await this.userRepository.findOne(loginUserDto);
        if (user == undefined) {
            return response.status(400).json({ error: 'Invalid user' });
        }
        //TODO: compare given pw with hashing pw
        //TODO: Generate Token
    }

}
>>>>>>> Stashed changes
