
import { User as PrismaUser } from "src/generated/prisma/client";
import { User } from "./user.entity";


export class UsersMapper {
    static toDomain(prismaUser: PrismaUser): User {
        return new User(
            prismaUser.id!,
            prismaUser.email!,
            prismaUser.name!,
            prismaUser.lastname!
        );
    }

    static toPrisma(user: User): PrismaUser {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            role: 'USER',
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    static toDomainofSupabase(user: any): User {
        return new User(
            user.id,
            user.email,
            user.name,
            user.lastname
        );
    }
}