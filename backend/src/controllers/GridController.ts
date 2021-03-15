import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { Discipline } from '../models/Discipline';
import { GridsRepository } from '../repositories/GridsRepository';

class GridController{
    async create(req: Request, res: Response){
        const { year, course, disciplines } = req.body

        const schema = yup.object().shape({
            year: yup.number().required('Year is required'),
            course: yup.object().shape({
                id: yup.string().uuid('Must be a valid course id').required('Course id is required'),
                name: yup.string().required('Course name is required'),
                created_at: yup.date().required('Course date is required')
            }),
            disciplines: yup.array().of(yup.object().shape({
                code: yup.string().required('Discipline code is required'),
                name: yup.string().required('Discipline name is required'),
                workload: yup.number().positive('Discipline positive number required')
                    .integer('Discipline workload required whole number').required('Discipline workload is required'),
                created_at: yup.date().required('Discipline creation date is required')
            }))
        })
        try {
            await schema.validate(req.body, { abortEarly: true })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectionGrid = getCustomRepository(GridsRepository)
        const gridAlreadyExists = await connectionGrid.findOne({ where: {course_id: course.id, year: year} }) 
        if(gridAlreadyExists){
            return res.status(400).json({ message: 'Grid already exists!' })
        }
        const grid = connectionGrid.create({ course_id: course.id, year, course_name: course.name })
        grid.disciplines = disciplines
        await connectionGrid.save(grid)

        return res.status(201).json(grid)
    }

    async ready(req: Request, res: Response){
        const connectionGrid = getCustomRepository(GridsRepository)
        const allGrids = await connectionGrid.find()
        const gridsDiscsNotRemoved = []
        let newGrid: any
        let disciplinesNotRemoved: Discipline[]
        
        // para retornar as disciplinas que não sofreram softDelete das grades
        allGrids.forEach(grid => {
            disciplinesNotRemoved = grid.disciplines.filter(
                (disc: Discipline) => disc.deleted_at === null
            )
            newGrid = {
                course_id: grid.course_id,
                year: grid.year,
                course_name: grid.course_name,
                created_at: grid.created_at,
                disciplines: disciplinesNotRemoved
            }
            gridsDiscsNotRemoved.push(newGrid)
        })
        return res.json(gridsDiscsNotRemoved)
    }

    async readyByCourseId(req: Request, res: Response){
        const { course_id } = req.params

        const connectionGrid = getCustomRepository(GridsRepository)
        const grid = await connectionGrid.findOne({ course_id })
        
        if(grid){
            // para retornar disciplinas que não sofreram softDelete da grade
            let newGrid: any
            const disciplinesNotRemoved = []
            grid.disciplines.forEach(disc => {
                if(disc.deleted_at === null) disciplinesNotRemoved.push(disc)  
            })
            newGrid = {
                course_id: grid.course_id,
                year: grid.year,
                course_name: grid.course_name,
                created_at: grid.created_at,
                disciplines: disciplinesNotRemoved
            }

            return res.json(newGrid)
        }

        return res.status(404).json({ message: 'Grid not found!' })
    }

    async delete(req: Request, res: Response){
        const { course_id } = req.params

        const connectionGrid = getCustomRepository(GridsRepository)
        const grid = await connectionGrid.findOne({ course_id })
        if(grid){
            await connectionGrid.delete(grid.course_id)
            return res.status(200).json({ message: 'Grid removend successfully!' })
        }
        return res.status(404).json({ message: 'Grid not found!' })
    }

    async update(req: Request, res: Response){
        const { course_id } = req.params

        const schema = yup.object().shape({
            year: yup.number().required('Year ir required'),
            course_id: yup.string().uuid('Must be a valid course id').required('Course id is required'),
            course_name: yup.string().required('Course name is required'),
            disciplines: yup.array().of(
                yup.object().shape({
                    id: yup.string().uuid('Must be a valid discipline id').required('Discipline id is required'),
                    code: yup.string().required('Discipline code is required'),
                    name: yup.string().required('Discipline name is required'),
                    workload: yup.number().positive().integer().required('Discipline workload is required'),
                    created_at: yup.date().required('Discipline date is required')
                })
            )
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectionGrid = getCustomRepository(GridsRepository)
        const grid = await connectionGrid.findOne({ course_id })
        if(grid){
            await connectionGrid.update(grid.course_id, req.body)
            return res.status(200).json({ message: 'Grid updated successfully' })
        }
        return res.status(404).json({ message: 'Grid not found!' })
    }
}

export { GridController };

