import { CreateUserDto } from "./create-user-dto";
import { UpdateUserDto } from "./update-user.dto";
import { User } from "./user.entity";
import { Prisma } from "src/generated/prisma/client";

export abstract class UserRepository {
    abstract create(data: CreateUserDto, tx?: Prisma.TransactionClient): Promise<User>;
    abstract findAll(tx?: Prisma.TransactionClient): Promise<User[]>;
    abstract findOne(id: string, tx?: Prisma.TransactionClient): Promise<User | null>;
    abstract findByEmail(email: string, tx?: Prisma.TransactionClient): Promise<User | null>;
    abstract update(id: string, data: UpdateUserDto, tx?: Prisma.TransactionClient): Promise<User>;
}