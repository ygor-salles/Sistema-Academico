import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Grid } from "./Grid";
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

    @OneToOne(() => Grid, grid => grid.course, { eager: true })
    grid: Grid

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Course }