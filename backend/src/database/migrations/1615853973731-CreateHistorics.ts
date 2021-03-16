import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateHistorics1615853973731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'historics',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'matriculation',
                        type: 'number'
                    },
                    {
                        name: 'semester',
                        type: 'integer'
                    },
                    {
                        name: 'year',
                        type: 'integer'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                ],
                checks: [
                    {
                        columnNames: ['semester'],
                        expression: `semester=1 OR semester=2`
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('historics')
    }

}
