import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
    async hashPassword(plainTextPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainTextPassword, salt);
    }
    async matchingPassword(plainTextPassword: string, password: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, password);
    }
}