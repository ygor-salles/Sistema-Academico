import { EntityRepository, Repository } from "typeorm";
import { Grid } from "../models/Grid";

@EntityRepository(Grid)
class GridsRepository extends Repository<Grid> {}

export { GridsRepository };
