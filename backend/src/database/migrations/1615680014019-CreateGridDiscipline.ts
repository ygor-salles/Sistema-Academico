import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateGridDiscipline1615680014019 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'grid_discipline',
                columns: [
                    {
                        name: 'grid_id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'discipline_id',
                        type: 'uuid',
                        isPrimary: true
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKGrid',
                        referencedTableName: 'grids',
                        referencedColumnNames: ['course_id'],
                        columnNames: ['grid_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKCourse',
                        referencedTableName: 'disciplines',
                        referencedColumnNames: ['id'],
                        columnNames: ['discipline_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('grid_discipline')
    }

}
