
import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { Prisma } from 'src/generated/prisma/client';
import { UsersMapper } from './users.mapper';
import { UserRepository } from './user.repository';
import { PrismaProvider } from 'src/infrastructure/prisma/prisma.provider';

@Injectable()
export class UsersService extends UserRepository {
    constructor(
        private readonly prisma: PrismaProvider
    ) {
        super();
    }

    async create(data: CreateUserDto, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        try {
            const user = await client.user.create({ data });
            return UsersMapper.toDomain(user);
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('El correo electrónico ya está registrado.');
            }
            throw error;
        }
    }

    async findAll(tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        const users = await client.user.findMany();
        return users.map(user => UsersMapper.toDomain(user));
    }

    async findOne(id: string, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        const user = await client.user.findUnique({
            where: { id },
        });
        return user ? UsersMapper.toDomain(user) : null;
    }

    async findByEmail(email: string, tx?: Prisma.TransactionClient) {
        const client = tx || this.prisma;
        const user = await client.user.findUnique({
            where: { email },
        });
        return user ? UsersMapper.toDomain(user) : null;
    }
}
