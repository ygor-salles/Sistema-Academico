import { EntityRepository, Repository } from "typeorm";
import { GridDiscipline } from "../models/GridDiscipline";

@EntityRepository(GridDiscipline)
class GridDisciplineRepository extends Repository<GridDiscipline> {}

export { GridDisciplineRepository };
