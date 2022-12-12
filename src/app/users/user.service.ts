/* eslint-disable camelcase */
import { PoolClient } from 'pg';
import { CreateUserDto } from '../../dto/user.dto/create-user.dto';
import { UpdateUserDto } from '../../dto/user.dto/update-user.dto';

export async function createUser(
    connection: PoolClient,
    user: CreateUserDto,
    // Omit<UserEntity, 'id' | 'family_id'> & Partial<Pick<UserEntity, 'family_id'>>
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

export async function updateUser(
    connection: PoolClient,
    userId: string,
    realyUser: UpdateUserDto,
    // Partial<Omit<UserEntity, 'id'>>,
) {
    const entries = Object.entries(realyUser);
    entries.push(['id', userId]);

    const { rows: [result] } = await connection.query(`
    update users
    set
    ${entries.slice(0, -1).map(([k], i) => {
        const dollar = `$${i + 1}`;
        return `${k} = ${dollar}`;
    }).join(', ')}
    where id = $${entries.length}
    returning *
    `, entries.map(([, v]) => v));

    return result;

    // const { rows: [result1] } = await connection.query(`
    // select *
    // from users
    // where id = $1
    // `, [userId]);

    // const { name: n, email: e, family_id: f } = result1;
    // const { name = n, email = e, family_id = f } = realyUser;

    // const { rows: [result] } = await connection.query(`
    // update users
    // set
    // name = $1,
    // email = $2,
    // family_id = $3
    // where id = $4
    // returning *
    // `, [name, email, family_id, userId]);

    // return result;
}

export async function allUsersWithFamily(
    connection: PoolClient,
    limskip: any,
) {
    const { limit, skip } = limskip;
    const { rows } = await connection.query(`
    select *
    from users
    where family_id is not null
    limit $1
    offset $2
    `, [limit, skip]);

    return rows;
}
