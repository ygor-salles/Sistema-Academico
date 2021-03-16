import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHistoricDiscipline1615853995096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'historic_discipline',
                columns: [
                    {
                        name: 'historic_id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'discipline_id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'note_discipline',
                        type: 'number'
                    },
                    {
                        name: 'status',
                        type: 'varchar'
                    },
                    {
                        name: 'required',
                        type: 'boolean'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                checks: [
                    {
                        columnNames: ['status'],
                        expression: `status='APROVADO' OR status='REPROVADO'` 
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKDiscipline',
                        referencedTableName: 'disciplines',
                        referencedColumnNames: ['id'],
                        columnNames: ['discipline_id']
                    },
                    {
                        name: 'FKHistoric',
                        referencedTableName: 'historics',
                        referencedColumnNames: ['id'],
                        columnNames: ['historic_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('historic_discipline')
    }

}
