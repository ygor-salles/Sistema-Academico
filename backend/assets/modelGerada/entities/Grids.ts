import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Disciplines } from "./Disciplines";
import { Courses } from "./Courses";

@Index("grids_pkey", ["courseId"], { unique: true })
@Entity("grids", { schema: "public" })
export class Grids {
  @Column("uuid", { primary: true, name: "course_id" })
  courseId: string;

  @Column("smallint", { name: "year" })
  year: number;

  @Column("character varying", { name: "course_name" })
  courseName: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @ManyToMany(() => Disciplines, (disciplines) => disciplines.grids)
  disciplines: Disciplines[];

  @ManyToOne(() => Courses, (courses) => courses.grids, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "course_id", referencedColumnName: "id" },
    { name: "course_id", referencedColumnName: "id" },
  ])
  courses: Courses;
}
