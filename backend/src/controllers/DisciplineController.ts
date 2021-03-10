import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from 'yup';
import { DisciplinesRepository } from "../repositories/DisciplinesRepository";

class DisciplineController {
    async create(req: Request, res: Response) {
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

        if (disciplineAlreadyExists && disciplineAlreadyExists.deleted_at !== null) {
            await connectionDiscipline.update(disciplineAlreadyExists.id, { deleted_at: null })
            return res.status(200).json({ message: 'Discipline successfully registered' })
        }
        else if (disciplineAlreadyExists) {
            return res.status(404).json({ message: 'Discipline already exists!' })
        }
        else {
            const discipline = connectionDiscipline.create({ code, name, workload })
            await connectionDiscipline.save(discipline)
            return res.status(201).json(discipline)
        }

    }

    async ready(req: Request, res: Response) {
        const disciplinesNotRemoved = []
        const connectionDiscipline = getCustomRepository(DisciplinesRepository)
        const allDisciplines = await connectionDiscipline.find()
        allDisciplines.forEach(disc => {
            if (disc.deleted_at === null) disciplinesNotRemoved.push(disc)
        })
        return res.json(disciplinesNotRemoved)
    }

    async readyByCode(req: Request, res: Response) {
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
        const discipline = await connectionDiscipline.findOne({ code })
        if (discipline && discipline.deleted_at === null) {
            return res.json(discipline)
        }

        return res.status(404).json({ message: 'Discipline not found!' })
    }

    async delete(req: Request, res: Response) {
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
        if (discipline && discipline.deleted_at === null) {
            await connectionDiscipline.update(discipline.id, { deleted_at: new Date() })
            return res.status(200).json({ message: 'Discipline removed successfully!' })
        }

        return res.status(404).json({ message: 'Discipline not found!' })
    }

    async update(req: Request, res: Response) {
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

        if (discipline && discipline.deleted_at===null) {
            await connectionDiscipline.update(discipline.id, req.body)
            return res.status(200).json({ message: 'Discipline update success' })
        }

        return res.status(404).json({ message: 'Discipline not found' })
    }
}

export { DisciplineController };

