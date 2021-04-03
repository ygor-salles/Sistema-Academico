import { Discipline } from './discipline.model';
import { Student } from './student.model';

export type Historic = {
    id: string;
    semester: number;
    year: number;
    created_at: Date;
    student_id: string;
    student: Student;
    historicDisciplines: {
        historic_id: string,
        discipline_id: string,
        note_discipline: number,
        status: string,
        required: boolean,
        created_at: Date,
        discipline: Discipline
    }
}