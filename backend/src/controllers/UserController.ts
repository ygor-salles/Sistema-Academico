import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
    async create(req: Request, resp: Response){
        // Pego os somente os dados que preciso do front com destructing
        const { name, email } = req.body
        
        // Inicializo a sessão com banco de dados, e a partir dessa constante consigo fazer tudo no banco
        const userRepository = getRepository(User)

        const userAlreadyExists = await userRepository.findOne({email})
        try {
            //Possíveis erros
            if(!name) throw 'Name is required'
            if(!email) throw 'E-mail is required'
            if(userAlreadyExists) throw 'User already exists!'

            //Caso não ocorra erro
            const user = userRepository.create({name, email})
            await userRepository.save(user)
            return resp.json(user)
        } catch (err) {
            resp.status(400).json({error: err})
        } 
    }
}

export { UserController }