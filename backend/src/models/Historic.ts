import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { HistoricDiscipline } from "./HistoricDiscipline";


@Entity('historics')
class Historic {
    @PrimaryColumn()
    readonly id: string

    @Column()
    matriculation: number

    @Column()
    semester: number

    @Column()
    year: number

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => HistoricDiscipline, (historicDiscipline) => historicDiscipline.historic, { eager: true })
    historicDisciplines: HistoricDiscipline[];
}

export { Historic }