import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { HistoricDiscipline } from "./HistoricDiscipline";
import { Student } from "./Student";
import { v4 as uuid } from 'uuid';

@Entity('historics')
class Historic {
    @PrimaryColumn()
    readonly id: string

    @Column()
    semester: number

    @Column()
    year: number

    @CreateDateColumn()
    created_at: Date

    @Column()
    student_id: string

    @ManyToOne(() => Student, { eager: true })
    @JoinColumn({ name: 'student_id' })
    student: Student

    @OneToMany(() => HistoricDiscipline, (historicDiscipline) => historicDiscipline.historic, { eager: true })
    historicDisciplines: HistoricDiscipline[];

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Historic }