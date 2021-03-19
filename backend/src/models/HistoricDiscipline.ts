import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Discipline } from "./Discipline";
import { Historic } from "./Historic";


@Entity('historic_discipline')
class HistoricDiscipline {
    @PrimaryColumn()
    readonly historic_id: string

    @PrimaryColumn()
    readonly discipline_id: string

    @Column()
    note_discipline: number

    @Column()
    status: string

    @Column()
    required: boolean

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => Discipline, (disciplines) => disciplines.historicDisciplines, { eager: true })
    @JoinColumn([{ name: "discipline_id", referencedColumnName: "id" }])
    discipline: Discipline;
    
    @ManyToOne(() => Historic, (historics) => historics.historicDisciplines, { onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn([{ name: "historic_id", referencedColumnName: "id" }])
    historic: Historic;
}

export { HistoricDiscipline }