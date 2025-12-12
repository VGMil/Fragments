// src/supabase/supabase.service.ts

import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SignUpUserDto } from 'src/users/dto/sign-up-user.dto';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL || "";
        const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
        console.log('SupabaseService: Connecting to', supabaseUrl);
        this.supabase = createClient(supabaseUrl, supabaseKey, {
            auth: {
                persistSession: false,
            }
        });
    }

    async getAuthUser(token: string) {
        return this.supabase.auth.getUser(token);
    }

    async signUp(signUser: SignUpUserDto) {
        const { data, error } = await this.supabase.auth.signUp({
            email: signUser.email,
            password: signUser.password,
        });
        if (error) throw error;
        return data;
    }

    async signIn(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    }

    async signOut(token: string) {
        const { error } = await this.supabase.auth.signOut();
        if (error) throw error;
    }
}