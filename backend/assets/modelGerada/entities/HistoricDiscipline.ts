import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Disciplines } from "./Disciplines";
import { Historics } from "./Historics";

@Index("historic_discipline_pkey", ["disciplineId", "historicId"], {
  unique: true,
})
@Entity("historic_discipline", { schema: "public" })
export class HistoricDiscipline {
  @Column("uuid", { primary: true, name: "historic_id" })
  historicId: string;

  @Column("uuid", { primary: true, name: "discipline_id" })
  disciplineId: string;

  @Column("double precision", { name: "note_discipline", precision: 53 })
  noteDiscipline: number;

  @Column("character varying", { name: "status", length: 10 })
  status: string;

  @Column("boolean", { name: "required" })
  required: boolean;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @ManyToOne(
    () => Disciplines,
    (disciplines) => disciplines.historicDisciplines
  )
  @JoinColumn([{ name: "discipline_id", referencedColumnName: "id" }])
  discipline: Disciplines;

  @ManyToOne(() => Historics, (historics) => historics.historicDisciplines, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "historic_id", referencedColumnName: "id" }])
  historic: Historics;
}
