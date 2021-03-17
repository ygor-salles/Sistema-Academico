import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { HistoricsRepository } from '../repositories/HistoricsRepository';

class HistoricController {
    async create(req: Request, res: Response) {
        const { matriculation, semester, year } = req.body

        const schema = yup.object().shape({
            matriculation: yup.number().required('Student matriculation is required'),
            semester: yup.number().required('Semester is required'),
            year: yup.number().required('Year is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })    
        }

        const connectionHistoric = getCustomRepository(HistoricsRepository)
        const historicAlreadyExists = await connectionHistoric.findOne({
            where: {matriculation: matriculation, semester: semester, year: year}
        })
        if(historicAlreadyExists){
            return res.status(400).json({ message: 'Historic already exists' })
        }

        const historic = connectionHistoric.create({ matriculation, semester, year })
        await connectionHistoric.save(historic)
        return res.status(201).json(historic)
    }

    async readyByMatriculation(req: Request, res: Response) {
        const { matriculation } = req.body

        const connectionHistoric = getCustomRepository(HistoricsRepository)
        const historicsStudent = await connectionHistoric.findOne({ where: {matriculation: matriculation} })
        return res.json(historicsStudent)
    }

    async deleteById(req: Request, res: Response) {
        const { id } = req.params

        const connectionHistoric = getCustomRepository(HistoricsRepository)
        const historic = await connectionHistoric.findOne({ id })
        if(historic){
            await connectionHistoric.delete(historic.id)
            return res.status(400).json({ message: 'Historic removed succesfully!' })
        }
        
        return res.status(404).json({ message: 'Historic not found!' })
    }

    async deleteByMatriculation(req: Request, res: Response) {
        
    }
}

export { HistoricController };
