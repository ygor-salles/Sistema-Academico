import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { HistoricDiscipline } from "./HistoricDiscipline";
import { Students } from "./Students";

@Index("historics_pkey", ["id"], { unique: true })
@Entity("historics", { schema: "public" })
export class Historics {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

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

  @ManyToOne(() => Students, (students) => students.historics, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "student_id", referencedColumnName: "id" }])
  student: Students;
}
