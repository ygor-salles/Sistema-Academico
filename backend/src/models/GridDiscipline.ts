import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Discipline } from "./Discipline";
import { Grid } from "./Grid";

@Entity('grid_discipline')
class GridDiscipline {
    @PrimaryColumn()
    readonly grid_id: string

    @PrimaryColumn()
    readonly discipline_id: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => Discipline, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'discipline_id' })
    discipline: Discipline

    @ManyToOne(() => Grid, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'grid_id' })
    grid: Grid
}

export { GridDiscipline };
