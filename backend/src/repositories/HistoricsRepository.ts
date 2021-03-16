import { EntityRepository, Repository } from "typeorm";
import { Historic } from "../models/Historic";

@EntityRepository(Historic)
class HistoricsRepository extends Repository<Historic> {}

export { HistoricsRepository }