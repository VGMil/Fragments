import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from 'src/infrastructure/supabase/supabase.provider';
import { ILoginUserInput } from './interfaces/login-user.interface';
import { ILoginUserOutput } from './interfaces/login-user.interface';
import { UserRepository } from 'src/core/user/user.repository';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
        private readonly userRepository: UserRepository
    ) { }

    async execute(data: ILoginUserInput): Promise<ILoginUserOutput> {
        const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword(data);

        if (authError) throw new UnauthorizedException(authError.message);
        if (!authData.user) throw new UnauthorizedException('No se pudieron obtener los datos del usuario');

        const user = await this.userRepository.findOne(authData.user.id);

        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado en el sistema local');
        }
        return {
            user: user,
            accessToken: authData.session?.access_token,
        };
    }
}