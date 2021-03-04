import { Request, Response } from "express";

class UserController {
    async create(req: Request, resp: Response){
        const body = req.body
        console.log(body)
        return resp.send()
    }
}

export { UserController }