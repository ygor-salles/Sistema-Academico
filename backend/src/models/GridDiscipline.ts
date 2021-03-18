import { PrimaryColumn } from "typeorm"

class GridDiscipline {
    @PrimaryColumn()
    readonly grid_id: string
    
    @PrimaryColumn()
    readonly discipline_id: string
}

export { GridDiscipline }