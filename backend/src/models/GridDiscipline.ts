import { Entity, PrimaryColumn } from "typeorm"

@Entity('grid_discipline')
class GridDiscipline {
    @PrimaryColumn()
    readonly grid_id: string
    
    @PrimaryColumn()
    readonly discipline_id: string
}

export { GridDiscipline }