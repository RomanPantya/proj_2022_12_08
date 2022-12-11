import { PoolClient } from 'pg';
import { CreateUserDto } from '../../dto/user.dto/create-user.dto';

export async function createUser(
    connection: PoolClient,
    user: CreateUserDto,
// Omit<FullUserDto, 'id' | 'family_id'> & Partial<Pick<FullUserDto, 'family_id'>>
) {
    const dollars: string[] = [];
    const entries = Object.entries(user);
    const { rows: [result] } = await connection.query(`
    insert into users(
    ${entries.map(([k], i) => {
        dollars.push(`$${i + 1}`);
        return `${k}`;
    }).join(', ')}
    )
    values(
    ${dollars.join(', ')}
    )
    returning *
    `, entries.map(([, v]) => v));

    return result;
}

export async function getOneUser(
    connection: PoolClient,
    userId: string,
) {
    const { rows: [result] } = await connection.query(`
    select * from users
    where id = $1
    `, [userId]);

    return result;
}

export async function getAllUsers(
    connection: PoolClient,
) {
    const { rows } = await connection.query(`
    select * 
    from users`);

    return rows;
}

export async function removeUser(
    connection: PoolClient,
    userId: string,
) {
    const { rows: [result] } = await connection.query(`
    delete from users
    where id = $1
    returning *
    `, [userId]);

    return result;
}
