import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Grids } from "./Grids";
import { HistoricDiscipline } from "./HistoricDiscipline";

@Index("disciplines_code_key", ["code"], { unique: true })
@Index("disciplines_pkey", ["id"], { unique: true })
@Entity("disciplines", { schema: "public" })
export class Disciplines {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "code", unique: true })
  code: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("integer", { name: "workload" })
  workload: number;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToMany(() => Grids, (grids) => grids.disciplines)
  @JoinTable({
    name: "grid_discipline",
    joinColumns: [{ name: "discipline_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "grid_id", referencedColumnName: "courseId" }],
    schema: "public",
  })
  grids: Grids[];

  @OneToMany(
    () => HistoricDiscipline,
    (historicDiscipline) => historicDiscipline.discipline
  )
  historicDisciplines: HistoricDiscipline[];
}
