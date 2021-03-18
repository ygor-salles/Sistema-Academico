import { EntityRepository, Repository } from "typeorm";
import { GridDiscipline } from "../models/GridDiscipline";

@EntityRepository(GridDiscipline)
class GridDisciplinesRepository extends Repository<GridDiscipline> {}

export { GridDisciplinesRepository };
