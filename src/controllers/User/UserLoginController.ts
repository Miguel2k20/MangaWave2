import { Request, Response } from "express"
import { userRepository } from "../../repositories/userRepository"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export class UserLoginController {
        
    async handle(req:Request, res:Response) {
        try {
            const { email, password } = req.body
            const user = await userRepository.findOneBy({email})
            
            if(!user) {
                res.status(400).send({"error": 'Senha ou E-mail Incorretos'})
                return
            }

            const validPass = await bcrypt.compare(password, user.password)

            if(!validPass) {
                res.status(400).send({"error": 'Senha ou E-mail Incorretos'})
                return
            }

            const jwtPayload = {
                id: user.id
            }

            const token = jwt.sign(jwtPayload, process.env.TOKEN_PASS ?? '', {expiresIn: '8h'})

            const {password:_, ...userData } = user

            res.send({
                'token': token,
                'user': userData
            })
        } catch (error) {
            res.status(500).json({
                message: "Erro interno do servidor",
                status: 500,
            });
        }
    }
}