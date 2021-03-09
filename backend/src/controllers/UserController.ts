import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from 'yup';
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
    index(req: Request, resp: Response) {
        return resp.send({ userId: req.userId })
    }

    async create(req: Request, resp: Response) {
        const { name, email, password, confirm_password } = req.body

        const schema = yup.object().shape({
            name: yup.string().required('Name is required'),
            email: yup.string().email().required('Email incorrect'),
            password: yup.string().required('Password is required'),
            confirm_password: yup.string().required('Confirm password is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        if (password !== confirm_password) {
            return resp.status(400).json({ message: 'Passwords do not match' })
        }

        const connectionUser = getCustomRepository(UsersRepository);

        const userAlreadyExists = await connectionUser.findOne({ email })

        if (userAlreadyExists && userAlreadyExists.deleted_at !== null) {
            await connectionUser.update(userAlreadyExists.id, { deleted_at: null })
            return resp.status(200).json({ message: 'User successfully registered' })
        }
        else if (userAlreadyExists) {
            return resp.status(404).json({ message: 'User already exists!' })
        }
        else {
            const user = connectionUser.create({ name, email, password })
            await connectionUser.save(user)
            delete user.password
            return resp.status(201).json(user)
        }
    }

    async ready(req: Request, resp: Response) {
        const usersNotRemoved = []
        const connectionUser = getCustomRepository(UsersRepository)
        const allUsers = await connectionUser.find()
        allUsers.forEach(user => {
            delete user.password
            if (user.deleted_at === null) usersNotRemoved.push(user)
        })
        return resp.json(usersNotRemoved)
    }

    async readyByEmail(req: Request, resp: Response) {
        const { email } = req.body

        const schema = yup.object().shape({
            email: yup.string().email().required('Email incorrect')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        const connectionUser = getCustomRepository(UsersRepository)
        const user = await connectionUser.findOne({ email })
        if (user) {
            delete user.password
            if (user.deleted_at !== null) return resp.status(400).json({ message: 'User not found' })
            else resp.json(user)
        }
        
        return resp.status(404).json({ message: 'User not found!' })
    }

    async delete(req: Request, resp: Response) {
        const { email } = req.body

        const schema = yup.object().shape({
            email: yup.string().email().required('Email incorrect')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        const connectionUser = getCustomRepository(UsersRepository)
        const user = await connectionUser.findOne({ email })
        if (user && user.deleted_at === null) {
            await connectionUser.update(user.id, { deleted_at: new Date() })
            return resp.status(200).json({ message: 'User removed successfully!' })
        }

        return resp.status(404).json({ message: 'User not found!' })
    }

    async update(req: Request, resp: Response) {
        const { email } = req.body

        const schema = yup.object().shape({
            email: yup.string().email().required('Email is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        const connectionUser = getCustomRepository(UsersRepository)
        const user = await connectionUser.findOne({ email })

        if (user && user.deleted_at === null) {
            await connectionUser.update(user.id, req.body)
            return resp.status(200).json({ message: 'User update success' })
        }

        return resp.status(404).json({ message: 'User not found' })
    }
}

export { UserController };
