import { Column, Entity, Index, OneToMany } from "typeorm";
import { HistoricDiscipline } from "./HistoricDiscipline";

@Index("historics_pkey", ["id"], { unique: true })
@Entity("historics", { schema: "public" })
export class Historics {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("integer", { name: "matriculation" })
  matriculation: number;

  @Column("smallint", { name: "semester" })
  semester: number;

  @Column("smallint", { name: "year" })
  year: number;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @OneToMany(
    () => HistoricDiscipline,
    (historicDiscipline) => historicDiscipline.historic
  )
  historicDisciplines: HistoricDiscipline[];
}
