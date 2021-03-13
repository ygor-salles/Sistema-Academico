import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Course } from "./Course";

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
}

export { Grid }