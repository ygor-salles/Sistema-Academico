import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateGrid1615589607425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'grids',
                columns: [
                    {
                        name: 'course_id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'year',
                        type: 'number',
                    },
                    {
                        name: 'course_name',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKCourse',
                        referencedTableName: 'courses',
                        referencedColumnNames: ['id'],
                        columnNames: ['course_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('grids')
    }

}
