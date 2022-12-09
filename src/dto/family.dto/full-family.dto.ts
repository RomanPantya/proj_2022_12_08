import { IFamily } from '../../entities/family/family.interface';

export class FullFamilyDto implements IFamily {
    id!: number;

    name!: string;

    leybel!: string;
}
