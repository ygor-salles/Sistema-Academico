import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Grid } from "./Grid";
import { HistoricDiscipline } from "./HistoricDiscipline";

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
    
    @Column({ nullable: true })
    deleted_at: Date | null

    @ManyToMany(() => Grid, (grid) => grid.disciplines)
    grids: Grid[]

    @OneToMany(() => HistoricDiscipline, (historicDiscipline) => historicDiscipline.discipline)
    historicDisciplines: HistoricDiscipline[];

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Discipline };

