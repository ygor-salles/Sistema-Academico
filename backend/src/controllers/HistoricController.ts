import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { HistoricsRepository } from '../repositories/HistoricsRepository';

class HistoricController {
    async create(req: Request, res: Response) {
        const { student, semester, year } = req.body

        const schema = yup.object().shape({
            student: yup.object().shape({
                id: yup.string().required('Student id is required'),
                matriculation: yup.string().required('Student matriculation is required'),
                name: yup.string().required('Student name is required'),
                course_id: yup.string().required('Student course_id is required'),
                created_at: yup.date().required('Student created_at is required')
            }),
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
            where: {student: student, semester: semester, year: year}
        })
        if(historicAlreadyExists){
            return res.status(400).json({ message: 'Historic already exists' })
        }

        const historic = connectionHistoric.create({ student, semester, year })
        await connectionHistoric.save(historic)
        return res.status(201).json(historic)
    }

    async readyByStudent(req: Request, res: Response) {
        const { student } = req.body

        const schema = yup.object().shape({
            student: yup.object().shape({
                id: yup.string().required('Student id is required'),
                matriculation: yup.string().required('Student matriculation is required'),
                name: yup.string().required('Student name is required'),
                course_id: yup.string().required('Student course_id is required'),
                created_at: yup.date().required('Student created_at is required')
            })
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectionHistoric = getCustomRepository(HistoricsRepository)
        const historicsStudent = await connectionHistoric.find({ where: {student: student} })
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

    // Ajustar essa lógica para deletar todos historicos daquele estudante
    async deleteByStudent(req: Request, res: Response) {
        const { student } = req.body

        const schema = yup.object().shape({
            student: yup.object().shape({
                id: yup.string().required('Student id is required'),
                matriculation: yup.string().required('Student matriculation is required'),
                name: yup.string().required('Student name is required'),
                created_at: yup.date().required('Student created_at is required')
            })
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectionHistoric = getCustomRepository(HistoricsRepository)
        const historicsStudent = await connectionHistoric.find({ where: { student: student } })
        if(historicsStudent){
            await connectionHistoric.delete(student)
            return res.status(200).json({ message: `${student.name} student history successfully removed` })
        }

        return res.status(404).json({ message: `Student ${student.name} has no historic` })
    }

    async update(req: Request, res: Response) {
        const { id } = req.params

        const schema = yup.object().shape({
            student: yup.object().shape({
                id: yup.string().required('Student id is required'),
                matriculation: yup.string().required('Student matriculation is required'),
                name: yup.string().required('Student name is required'),
                created_at: yup.date().required('Student created_at is required')
            }),
            semester: yup.number().required('Semester is required'),
            year: yup.number().required('Year is required') 
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectionHistoric = getCustomRepository(HistoricsRepository)
        const historic = await connectionHistoric.findOne({ id })
        if(historic){
            await connectionHistoric.update(historic.id, req.body)
            return res.status(200).json({ message: 'Historic update success' })
        }

        return res.status(404).json({ message: 'Historic not found!' })
    }
}

export { HistoricController };
