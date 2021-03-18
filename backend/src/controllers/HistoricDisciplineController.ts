import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { HistoricDisciplinesRepository } from '../repositories/HistoricDisciplineRepository';
import { CoursesRepository } from '../repositories/CoursesRepository';

class HistoricDisciplineController {
    async execute(req: Request, res: Response) {
        const { matriculation, historic_id, discipline_id, note_disicipline } = req.body

        const schema = yup.object().shape({
            historic_id: yup.string().required('Historic id is required'),
            discipline_id: yup.string().required('Historic id is required'),
            note_disicipline: yup.string().required('Historic id is required'),
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectHistDisc = getCustomRepository(HistoricDisciplinesRepository)
        const histDisc = await connectHistDisc.findOne({ 
            where: {historic_id, discipline_id}, 
            relations: ['historics', 'disciplines'] 
        })
        if(histDisc){
            return res.status(400).json({ message: 'You cannot take two courses in the same semester!' })
        }
        
        // lógica de status
        let status: string
        note_disicipline >= 6 ? status='APROVADO' : status='REPROVADO'
        
        // logica de required, se a disciplina é obrigatória ou não
        const grid = await this.studentGridSearch(matriculation, req, res)
        if(!grid){
            return res.status(404).json({ message: 'Grid student not found!' })
        }

        let required: boolean
        this.verifyMandatoryDiscipline(grid.course_id, discipline_id) ? required=true : required=false
    }

    async studentGridSearch(matriculation: number, req: Request, res: Response) {
        const connectCourse = getCustomRepository(CoursesRepository)
        const allCourse = await connectCourse.find()
        allCourse.forEach(course => {
            course.students.forEach(student => {
                if(student.matriculation == matriculation) return course.grid
            })
        })

        return null
    }

    async verifyMandatoryDiscipline(grid_id, discipline_id) {
        
    }
}

export { HistoricDisciplineController }