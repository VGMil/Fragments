import { Injectable, Inject, UnauthorizedException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from 'src/infrastructure/supabase/supabase.provider';
import { UsersMapper } from 'src/core/user/users.mapper';
import { IRegisterUserInput, IRegisterUserOutput } from './interfaces/register-user.interface';
import { WalletRepository } from 'src/core/wallet/wallet.repository';
import { CurrencyRepository } from 'src/core/currency/currency.repository';
import { WalletMapper } from 'src/core/wallet/wallet.mapper';
import { Decimal } from '@prisma/client/runtime/client';
import { UserRepository } from 'src/core/user/user.repository';
import { PrismaProvider } from 'src/infrastructure/prisma/prisma.provider';
import { User } from 'src/core/user/user.entity';
import { Wallet } from 'src/core/wallet/wallet.entity';

@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
        private readonly walletRepository: WalletRepository,
        private readonly currencyRepository: CurrencyRepository,
        private readonly userRepository: UserRepository,
        private readonly prisma: PrismaProvider
    ) { }

    async execute(data: IRegisterUserInput): Promise<IRegisterUserOutput> {
        const { data: response, error } = await this.supabase.auth.signUp(data);

        if (error) {
            if (error.status === 422 || error.message.includes('already registered')) {
                throw new ConflictException('El usuario ya está registrado');
            }
            throw new BadRequestException(error.message);
        }
        if (!response.user) throw new UnauthorizedException('No se pudo registrar el usuario');

        const userId = response.user.id;
        const userEmail = response.user.email!;

        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const createdUser = await this.userRepository.create({
                    id: userId,
                    email: userEmail,
                    name: data.name,
                    lastname: data.lastname,
                    role: 'USER',
                }, tx);

                const currencies = await this.currencyRepository.findAll(tx);
                if (!currencies || currencies.length === 0) {
                    throw new Error('No se pudo obtener las monedas para inicializar wallets');
                }
                const createdWallets: Wallet[] = [];
                for (const unit of currencies) {
                    const wallet = await this.walletRepository.create(createdUser.id, unit.id, tx);
                    createdWallets.push(wallet);
                }

                return { user: createdUser, wallets: createdWallets };
            });

            return {
                user: result.user,
                wallet: result.wallets
            };

        } catch (error) {
            await this.supabase.auth.admin.deleteUser(userId);

            // Prisma error code for Unique Constraint Violation
            if ((error as any).code === 'P2002') {
                throw new ConflictException('Ya existe un registro con esos datos en el sistema');
            }

            throw new InternalServerErrorException('Error interno al completar el registro: ' + error.message);
        }
    }
}