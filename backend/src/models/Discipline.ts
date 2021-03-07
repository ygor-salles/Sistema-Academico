import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('disciplines')
class Discipline{
    @PrimaryColumn()
    readonly id: string

    @Column({unique: true})
    code: string

    @Column()
    name: string

    @Column()
    workload: number

    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Discipline }