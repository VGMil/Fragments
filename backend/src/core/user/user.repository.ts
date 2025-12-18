import { CreateUserDto } from "./create-user-dto";
import { User } from "./user.entity";
import { Prisma } from "src/generated/prisma/client";

export interface IUserRepository {
    create(data: CreateUserDto, tx?: Prisma.TransactionClient): Promise<User>;
    findAll(tx?: Prisma.TransactionClient): Promise<User[]>;
    findOne(id: string, tx?: Prisma.TransactionClient): Promise<User | null>;
    findByEmail(email: string, tx?: Prisma.TransactionClient): Promise<User | null>;
}