import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Course } from "./Course";
import { Discipline } from "./Discipline";
import { GridDiscipline } from "./GridDiscipline";

@Entity('grids')
class Grid{
    @PrimaryColumn()
    readonly course_id: string

    @Column()
    year: number

    @Column()
    course_name: string

    @CreateDateColumn()
    created_at: Date

    @OneToOne(() => Course, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course

    @OneToMany(() => GridDiscipline, disciplines => disciplines.grid, { eager: true })
    disciplines: GridDiscipline[]

}

export { Grid }