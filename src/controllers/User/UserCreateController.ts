import { Request, Response } from "express"
import { userRepository } from "../../repositories/userRepository"
import bcrypt from 'bcrypt'

export class UserCreateController {
    async handle(req:Request, res:Response) {
        try {
            const { name, email, password } = req.body
            const checkUserExist = await userRepository.findOneBy({email})
            
            if(checkUserExist) {
                res.status(400).send({"error": 'Esse Email já está sendo utilizado'})
            }
    
            const hashPass = await bcrypt.hash(password, 10)
    
            const newUser = userRepository.create({
                name,
                email,
                password: hashPass
            })

            const savedUser = await userRepository.save(newUser);
    
            res.status(201).send({
                "Nome": savedUser.name,
                "E-mail": savedUser. email,
                "id": savedUser.id
            })

        } catch (error) {
            res.status(500).json({
                message: "Erro interno do servidor",
                status: 500,
            });
        }
    }
}