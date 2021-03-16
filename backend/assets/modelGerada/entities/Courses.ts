import { Column, Entity, Index, OneToMany } from "typeorm";
import { Grids } from "./Grids";
import { Students } from "./Students";

@Index("courses_pkey", ["id"], { unique: true })
@Entity("courses", { schema: "public" })
export class Courses {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @OneToMany(() => Grids, (grids) => grids.courses)
  grids: Grids[];

  @OneToMany(() => Students, (students) => students.courses)
  students: Students[];
}
