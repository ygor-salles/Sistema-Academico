import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Student } from "./Student";

@Entity('courses')
class Course{
    @PrimaryColumn()
    readonly id: string

    @Column({ unique: true })
    name: string

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => Student, student => student.course, { eager: true })
    students: Student[]

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Course }