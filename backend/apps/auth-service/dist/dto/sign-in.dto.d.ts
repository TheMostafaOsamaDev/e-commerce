import { CreateAuthDto } from './create-auth.dto';
declare const SignInDto_base: import("@nestjs/mapped-types").MappedType<Pick<CreateAuthDto, "email" | "password">>;
export declare class SignInDto extends SignInDto_base {
}
export {};
