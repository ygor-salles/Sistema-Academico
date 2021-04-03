import { Student } from './student.model';
import { Grid } from './grid.model';

export type Course = {
    id: string;
    name: string;
    created_at: Date;
    students: Student[];
    grid: Grid
}