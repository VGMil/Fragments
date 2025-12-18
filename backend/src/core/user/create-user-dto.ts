import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';

export class CreateUserDto {
    @IsUUID() // O @IsString() según uses UUID de Supabase o no
    @IsNotEmpty()
    id: string;

    @IsEmail({}, { message: 'El formato del correo es inválido' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    lastname?: string;

    @IsEnum(['USER']) // Obligas a que solo pueda ser 'USER'
    role: 'USER' = 'USER'; // Le damos un valor por defecto
}