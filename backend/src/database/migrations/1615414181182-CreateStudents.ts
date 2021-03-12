import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStudents1615414181182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'students',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'matriculation',
                        type: 'number',
                        isUnique: true
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'course_id',
                        type: 'uuid',
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKCourse',
                        referencedTableName: 'courses',
                        referencedColumnNames: ['id'],
                        columnNames: ['course_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('students')
    }

}
