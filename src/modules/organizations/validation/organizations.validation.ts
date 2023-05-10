import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ICreateOrg, IUpdateOrg } from './organizations.interface';

export class CreateOrgDTO implements ICreateOrg {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
export class UpdateOrgDTO implements IUpdateOrg {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
