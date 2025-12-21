import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/core/user/user.entity";
import { UserRepository } from "src/core/user/user.repository";

@Injectable()
export class GetMyProfileUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(userId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return user;
    }
}
