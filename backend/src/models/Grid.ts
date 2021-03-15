import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Course } from "./Course";
import { Discipline } from "./Discipline";

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

    @ManyToMany(() => Discipline, discipline => discipline.grids, { eager: true })
    @JoinTable({
        name: 'grid_discipline',
        joinColumns: [{ name: "grid_id", referencedColumnName: "course_id" }],
        inverseJoinColumns: [{ name: "discipline_id", referencedColumnName: "id" }],
    })
    disciplines: Discipline[]
    
}

export { Grid };
