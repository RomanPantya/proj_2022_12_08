import { IFamily } from './family.interface';

export class FamilyEntity implements IFamily {
    id!: number;

    name!: string;

    leybel!: string;
}
