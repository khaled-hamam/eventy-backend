import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { user } from './user';

@Controller('users')
export class UsersController {
    @Post('/register')
    register(@Body() user: user) {
    }
    @Post('/login')
    login(@Param('id') id) {
    }

}
