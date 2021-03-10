import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup'
import { CoursesRepository } from '../repositories/CoursesRepository';

class CourseController{
    async create(req: Request, resp: Response) {
        const { name } = req.body

        const schema = yup.object().shape({
            name: yup.string().required('Name is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        const connectionCourse = getCustomRepository(CoursesRepository)
        const courseAlredyExists = await connectionCourse.findOne({ name })

        if(courseAlredyExists){
            return resp.status(400).json({ message: 'Course already exists' })
        }

        const course = connectionCourse.create({ name })
        await connectionCourse.save(course)
        return resp.status(201).json(course)
    }

    async ready(req: Request, resp: Response){
        const connectCourse = getCustomRepository(CoursesRepository)
        const courses = await connectCourse.find()
        return resp.json(courses)
    }

    async readyByName(req: Request, resp: Response){
        const { name } = req.body

        const schema = yup.object().shape({
            name: yup.string().required('Name is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        const connectionCourse = getCustomRepository(CoursesRepository)
        const course = connectionCourse.findOne({ name })
        if(course){
            return resp.json(course)
        }
        return resp.status(404).json({ message: 'Course not found!' })
    }

    async delete(req: Request, resp: Response){
        const { name } = req.body

        const schema = yup.object().shape({
            name: yup.string().required('Name is required!')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        const connectionCourse = getCustomRepository(CoursesRepository)
        const course = await connectionCourse.findOne({ name })
        if(course){
            await connectionCourse.delete(course.id)
            return resp.status(400).json({ message: 'Course removed successfully!' })
        }
        return resp.status(404).json({ message: 'Course not found' })
    }

    async update(req: Request, res: Response) {
        const { name } = req.body

        const schema = yup.object().shape({
            name: yup.string().required('Name is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return res.status(400).json({ message: error })
        }

        const connectionCourse = getCustomRepository(CoursesRepository)
        const course = await connectionCourse.findOne({ name })

        if (course) {
            await connectionCourse.update(course.id, req.body)
            return res.status(200).json({ message: 'Course update success' })
        }

        return res.status(404).json({ message: 'Course not found' })
    }
}

export { CourseController }