import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { StudentsRepository } from '../repositories/StudentsRepository';

class StudentController{
    async create(req: Request, resp: Response) {
        const { matriculation, name, course } = req.body

        const schema = yup.object().shape({
            matriculation: yup.string().required('Matriculation is required'),
            name: yup.string().required('Name is required'),
            course: yup.object().shape({
                name: yup.string().required('Name is required')
            })
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error})
        }

        const connectionStudent = getCustomRepository(StudentsRepository)
        const studentAlreadyExists = await connectionStudent.findOne({ matriculation })
        if(studentAlreadyExists){
            return resp.status(400).json({ message: 'Student already exists!' })
        }

        const student = connectionStudent.create({ matriculation, name, course })
        await connectionStudent.save(student)
        return resp.status(201).json(student)
    }

    async ready(req: Request, resp: Response){
        const connectionStudent = getCustomRepository(StudentsRepository)
        const allStudents = await connectionStudent.find()
        return resp.json(allStudents) 
    }

    async readyById(req: Request, resp: Response){
        const { id } = req.params

        const connectionStudent = getCustomRepository(StudentsRepository)
        const student = await connectionStudent.findOne({ id })
        if(!student){
            return resp.status(404).json({ message: 'Student not found' })
        }
        return resp.json(student)
    }

    async delete(req: Request, resp: Response){
        const { id } = req.params

        const connectionStudent = getCustomRepository(StudentsRepository)
        const student = await connectionStudent.findOne({ id })
        if(!student){
            return resp.status(404).json({ message: 'Student not found' })
        }
        await connectionStudent.delete(student.id)
        return resp.status(200).json({ message: 'Student removed successfully!' })
    }

    async update(req: Request, resp: Response) {
        const { id } = req.params

        const schema = yup.object().shape({
            matriculation: yup.string().required('Matriculation is required'),
            name: yup.string().required('Name is required'),
            course_id: yup.string().required('Course id is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error})
        }

        const connectionStudent = getCustomRepository(StudentsRepository)
        const student = await connectionStudent.findOne({ id })
        if(!student){
            return resp.status(400).json({ message: 'Student not found' })
        }

        await connectionStudent.update(student.id, req.body)
        return resp.status(200).json({ message: 'Student update success' })
    }
}

export { StudentController };
