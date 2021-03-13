import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { GridsRepository } from '../repositories/GridsRepository';

class GridController{
    async create(req: Request, res: Response){
        const { year, course } = req.body

        const schema = yup.object().shape({
            year: yup.number().required('Year is required'),
            course: yup.object().shape({
                id: yup.string().uuid('Must be a valid course id').required('Course id is required'),
                name: yup.string().required('Course name is required'),
                created_at: yup.date().required('Course date is required')
            })
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
        console.log(grid)
        await connectionGrid.save(grid)
        return res.status(201).json(grid)
    }

    async ready(req: Request, res: Response){
        const connectionGrid = getCustomRepository(GridsRepository)
        const allGrids = await connectionGrid.find()
        return res.json(allGrids)
    }

    async readyByCourseId(req: Request, res: Response){
        const { course_id } = req.params

        const connectionGrid = getCustomRepository(GridsRepository)
        const grid = await connectionGrid.findOne({ course_id })
        if(grid){
            return res.json(grid)
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
            course_name: yup.string().required('Course name is required')
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

export { GridController }