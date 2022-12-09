import { IUser } from '../../entities/users/user.inrerface';

export class FullUserDto implements IUser {
    id!: number;

    name!: string;

    email!: string;

    family_id!: number;
}
