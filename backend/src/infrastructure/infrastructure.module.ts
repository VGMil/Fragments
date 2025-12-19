
import { Global, Module } from '@nestjs/common';
import { PrismaProvider } from './prisma/prisma.provider';
import { SupabaseProvider } from './supabase/supabase.provider';

@Global()
@Module({
    providers: [
        PrismaProvider,
        SupabaseProvider
    ],
    exports: [
        PrismaProvider,
        SupabaseProvider
    ],
})
export class InfrastructureModule { }
