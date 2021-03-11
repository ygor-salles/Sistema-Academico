import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Course } from "./Course";

@Entity('students')
class Student {
    @PrimaryColumn()
    readonly id: string;

    @Column({ unique: true })
    matriculation: string;

    @Column()
    name: string;

    @Column()
    course_id: string;

    @CreateDateColumn()
    created_at: Date;

    // @ManyToOne(type => Course, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @ManyToOne(() => Course, course => course.students)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Student }