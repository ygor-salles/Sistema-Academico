import { EntityRepository, Repository } from "typeorm";
import { Discipline } from "../models/Discipline";

@EntityRepository(Discipline)
class DisciplinesRepository extends Repository<Discipline> {}

export { DisciplinesRepository };
