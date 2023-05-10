import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AddOrgUserDTO {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  user_id: string;
}
export class AddOrgUsersDTO {
  @IsDefined()
  @IsNotEmpty()
  user_ids: string[];
}
