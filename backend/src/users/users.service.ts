
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async signUp(createUserDto: CreateUserDto) {
        try {
            return await this.prisma.user.create({
                data: {
                    id: createUserDto.id,
                    email: createUserDto.email,
                    name: createUserDto.name,
                    lastname: createUserDto.lastname,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('El correo electrónico ya está registrado.');
            }
            throw error;
        }
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    findOneByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
