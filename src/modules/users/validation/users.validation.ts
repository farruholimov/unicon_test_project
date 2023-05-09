import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ICreateUser, IUpdateUser } from './users.interface';

export class CreateUserDTO implements ICreateUser {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  role: number;
}
export class UpdateUserDTO implements IUpdateUser {
  @IsString()
  name: string;

  @IsNumber()
  role: number;
}
