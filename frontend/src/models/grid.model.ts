import { Discipline } from "./discipline.model";

export type Grid = {
    course_id: string;
    year: number;
    course_name: string;
    created_at: Date;
    disciplines: Discipline[];
}