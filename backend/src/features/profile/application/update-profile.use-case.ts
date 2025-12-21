import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/core/user/user.repository";
import { UpdateUserDto } from "src/core/user/update-user.dto";
import { User } from "src/core/user/user.entity"; // Assuming User entity is here

@Injectable()
export class UpdateProfileUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(userId: string, data: UpdateUserDto): Promise<User> {
        if (!userId) {
            throw new NotFoundException('User not found');
        }

        try {
            const updatedUser = await this.userRepository.update(userId, data);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }
}
