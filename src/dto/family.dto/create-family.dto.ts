import { OmitType } from '@nestjs/mapped-types';
import { FullFamilyDto } from './full-family.dto';

export class CreateFamilyDto extends OmitType(FullFamilyDto, ['id']) {}
