import { PoolClient } from 'pg';
import { CreateFamilyDto } from '../../dto/family.dto/create-family.dto';

export async function createFamily(
    connection: PoolClient,
    family: CreateFamilyDto,
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
