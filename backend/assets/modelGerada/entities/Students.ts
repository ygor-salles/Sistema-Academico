import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Historics } from "./Historics";
import { Courses } from "./Courses";

@Index("students_pkey", ["id"], { unique: true })
@Index("students_matriculation_key", ["matriculation"], { unique: true })
@Entity("students", { schema: "public" })
export class Students {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("integer", { name: "matriculation", unique: true })
  matriculation: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @OneToMany(() => Historics, (historics) => historics.student)
  historics: Historics[];

  @ManyToOne(() => Courses, (courses) => courses.students, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "course_id", referencedColumnName: "id" },
    { name: "course_id", referencedColumnName: "id" },
  ])
  courses: Courses;
}
