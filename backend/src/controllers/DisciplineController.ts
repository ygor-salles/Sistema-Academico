import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from 'yup';
import { DisciplinesRepository } from "../repositories/DisciplinesRepository";

class DisciplineController{
    async create(req: Request, res: Response){
        const { code, name, workload } = req.body

        const schema = yup.object().shape({
            code: yup.string().required('Code is required'),
            name: yup.string().required('Name is required'),
            workload: yup.number().required('Workload is required')
        })

        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectionDiscipline = getCustomRepository(DisciplinesRepository)

        const disciplineAlreadyExists = await connectionDiscipline.findOne({ code })

        if(disciplineAlreadyExists){
            return res.status(404).json({ message: 'Discipline already exists!' })
        }

        const discipline = connectionDiscipline.create({ code, name, workload })
        await connectionDiscipline.save(discipline)
        return res.status(201).json(discipline)
    }

    async ready(req: Request, res: Response){
        const connectionDiscipline = getCustomRepository(DisciplinesRepository)
        const allDisciplines = await connectionDiscipline.find()
        return res.json(allDisciplines)
    }

    async readyByCode(req: Request, res: Response){
        const { code } = req.body

        const schema = yup.object().shape({
            code: yup.string().required('Code ir required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectionDiscipline = getCustomRepository(DisciplinesRepository)
        const discipline =  await connectionDiscipline.findOne({ code })
        if(discipline){
            return res.json(discipline)
        }
        else{
            return res.status(404).json({ message: 'Discipline not found!' })
        }
    }

    async delete(req: Request, res: Response){
        const { code } = req.body

        const schema = yup.object().shape({
            code: yup.string().required('Email incorrect')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectionDiscipline = getCustomRepository(DisciplinesRepository)
        const discipline = await connectionDiscipline.findOne({ code })
        if (discipline) {
            await connectionDiscipline.delete(discipline.id)
            return res.status(200).json({ message: 'Discipline removed successfully!' })
        }
        else {
            return res.status(404).json({ message: 'Discipline not found!' })
        }
    }

    async update(req: Request, res: Response){
        const { code } = req.body

        const schema = yup.object().shape({
            code: yup.string().required('code is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectionDiscipline = getCustomRepository(DisciplinesRepository)
        const discipline = await connectionDiscipline.findOne({ code })
        
        if (discipline) {
            await connectionDiscipline.update(discipline.id, req.body)
            return res.status(200).json({ message: 'Discipline update success' })
        }

        return res.status(404).json({ message: 'Discipline not found' })
    }
}

export { DisciplineController };
