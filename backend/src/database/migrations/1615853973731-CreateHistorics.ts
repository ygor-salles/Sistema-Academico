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
                    {
                        name: 'student_id',
                        type: 'uuid'
                    }
                ],
                checks: [
                    {
                        columnNames: ['semester'],
                        expression: `semester=1 OR semester=2`
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKStudent',
                        referencedTableName: 'students',
                        referencedColumnNames: ['id'],
                        columnNames: ['student_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('historics')
    }

}
