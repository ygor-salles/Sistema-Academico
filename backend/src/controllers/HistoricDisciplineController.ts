import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { CoursesRepository } from '../repositories/CoursesRepository';
import { GridDisciplinesRepository } from '../repositories/GridDisciplineRepository';
import { HistoricDisciplinesRepository } from '../repositories/HistoricDisciplineRepository';
import { StudentsRepository } from '../repositories/StudentsRepository';

class HistoricDisciplineController {
    async execute(req: Request, res: Response) {
        const { matriculation, historic_id, discipline_id, note_discipline } = req.body

        const schema = yup.object().shape({
            matriculation: yup.string().required('Matriculation is required'),
            historic_id: yup.string().required('Historic id is required'),
            discipline_id: yup.string().required('Historic id is required'),
            note_discipline: yup.string().required('Historic id is required'),
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectHistDisc = getCustomRepository(HistoricDisciplinesRepository)
        const histDiscAlreadyExists = await connectHistDisc.findOne({ 
            where: {historic_id, discipline_id} 
        })
        if(histDiscAlreadyExists){
            return res.status(400).json({ message: 'You cannot take two courses in the same semester!' })
        }
        
        // lógica de status
        let status: string
        note_discipline >= 6 ? status='APROVADO' : status='REPROVADO'
        
        // logica de required, se a disciplina é obrigatória ou não
        // Verificar o curso do estudante, pois o id da Grade é o mesmo do curso
        const student = await studentCourseSearch(matriculation)
        console.log(student)
        if(!student){
            return res.status(404).json({ message: 'Grid student not found!' })
        }

        // verifica se a disciplina é obrigatória na grade do curso do aluno
        const required = await verifyMandatoryDiscipline(student.course_id, discipline_id)

        const histDisc = connectHistDisc.create({ historic_id, discipline_id, note_discipline, status, required })
        await connectHistDisc.save(histDisc)
        return res.status(201).json(histDisc)
    }

}

export async function studentCourseSearch(matriculation: number) {
    const connectStudent = getCustomRepository(StudentsRepository)
    return await connectStudent.findOne({ matriculation })
}

export async function verifyMandatoryDiscipline(grid_id: string, discipline_id: string) {
    const connectGridDisc = getCustomRepository(GridDisciplinesRepository)
    const gridDisc = await connectGridDisc.findOne({ where: { grid_id, discipline_id } })
    if(gridDisc){
        return true
    }
    return false
}

export { HistoricDisciplineController };
