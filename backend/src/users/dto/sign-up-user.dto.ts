export class SignUpUserDto {
    email: string;
    password: string;
    name?: string;
    lastname?: string;
    role: 'USER';
}
