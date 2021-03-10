import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Course } from "./Course";

@Entity('students')
class Student {
    @PrimaryColumn()
    readonly id: string

    @Column({ unique: true })
    matriculation: string

    @Column()
    name: string

    @ManyToOne(() => Course, course => course.students)
    course: Course

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Student }