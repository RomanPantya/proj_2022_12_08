import {
    OmitType, PickType, PartialType, IntersectionType,
} from '@nestjs/mapped-types';
import { FullUserDto } from './full-user.dto';

export class CreateUserDto extends IntersectionType(OmitType(FullUserDto, ['id']), PartialType(PickType(FullUserDto, ['family_id']))) {}
