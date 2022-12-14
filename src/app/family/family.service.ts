import { PoolClient } from 'pg';
import { CreateFamilyDto } from '../../dto/family.dto/create-family.dto';
import { UpdateFamilyDto } from '../../dto/family.dto/update-family.dto';

export async function createFamily(
    connection: PoolClient,
    family: CreateFamilyDto,
    // Omit<FamilyEntity, 'id'>
) {
    const { rows: [result] } = await connection.query(`
    insert into family(
      name,
      leybel
    )
    values(
      $1,
      $2
    )
    returning *
    `, [family.name, family.leybel]);
    return result;
}

export async function getOneFamily(
    connection: PoolClient,
    familyId: string,
) {
    const { rows: [result] } = await connection.query(`
    select *
    from family
    where id = $1
    `, [familyId]);

    return result;
}

export async function getAllFemily(
    connection: PoolClient,
) {
    const { rows } = await connection.query(`
  select *
  from family
  `);

    return rows;
}

export async function removeOneFamily(
    connection: PoolClient,
    familyId: string,
) {
    const { rows: [result] } = await connection.query(`
    delete from family
    where id = $1
    returning *
    `, [familyId]);

    return result;
}

export async function updateFamily(
    connection: PoolClient,
    familyId: string,
    family: UpdateFamilyDto,
    // Partial<Omit<FamilyEntity, 'id'>>,
) {
    const entries = Object.entries(family);
    entries.push(['id', familyId]);

    const { rows: [result] } = await connection.query(`
    update family
    set
    
    ${entries.slice(0, -1).map(([k], i) => {
        const dollar = `$${i + 1}`;

        return `${k} = ${dollar}`;
    }).join(' ,')}

    where id = $${entries.length}
    returning *   
    `, entries.map(([, v]) => v));

    return result;

    // const { rows: [result1] } = await connection.query(`
    // select * from family
    // where id = $1
    // `, [familyId]);

    // const { name: nameF, leybel: leybelF } = result1;
    // const { name = nameF, leybel = leybelF } = family;

    // const { rows: [result] } = await connection.query(`
    // update family
    // set
    // name = $1,
    // leybel = $2
    // where id = $3
    // returning *
    // `, [name, leybel, familyId]);

    // return result;
}
