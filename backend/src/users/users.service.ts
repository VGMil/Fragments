
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { Prisma, User } from 'src/generated/prisma/client';

interface UserService {
    create(data: CreateUserDto, tx?: Prisma.TransactionClient): Promise<User>;
    findAll(tx?: Prisma.TransactionClient): Promise<User[]>;
    findOne(id: string, tx?: Prisma.TransactionClient): Promise<User | null>;
    findOneByEmail(email: string, tx?: Prisma.TransactionClient): Promise<User | null>;
}

@Injectable()
export class UsersService implements UserService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateUserDto, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        try {
            return await client.user.create({ data });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('El correo electrónico ya está registrado.');
            }
            throw error;
        }
    }

    findAll(tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        return client.user.findMany();
    }

    findOne(id: string, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        return client.user.findUnique({
            where: { id },
        });
    }

    findOneByEmail(email: string, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        return client.user.findUnique({
            where: { email },
        });
    }
}
