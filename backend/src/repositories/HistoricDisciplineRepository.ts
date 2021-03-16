import { EntityRepository, Repository } from "typeorm";
import { HistoricDiscipline } from "../models/HistoricDiscipline";

@EntityRepository(HistoricDiscipline)
class HistoricDisciplinesRepository extends Repository<HistoricDiscipline> {}

export { HistoricDisciplinesRepository }