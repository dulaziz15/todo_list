import { Createuser2Dto } from './create-user2.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(Createuser2Dto) {}
