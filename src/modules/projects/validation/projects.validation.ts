import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ICreateProject, IUpdateProject } from './projects.interface';

export class CreateProjectDTO implements ICreateProject {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
export class UpdateProjectDTO implements IUpdateProject {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
