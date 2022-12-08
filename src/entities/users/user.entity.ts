import { IUser } from './user.inrerface';

export class UserEntity implements IUser {
    id!: number;

    name!: string;

    email!: string;

    family_id!: number;
}
