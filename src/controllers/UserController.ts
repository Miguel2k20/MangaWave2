import { Request, Response } from "express"
import { userRepository } from "../repositories/userRepository"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export class UserController {

    async create(req:Request, res:Response) {
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
    
            return res.status(201).send({
                "Nome": savedUser.name,
                "E-mail": savedUser. email,
                "id": savedUser.id
            })

        } catch (error) {
            return res.status(500).json({
                message: "Erro interno do servidor",
                status: 500,
            });
        }
    }
    
    async login(req:Request, res:Response) {
        try {
            const { email, password } = req.body
            const user = await userRepository.findOneBy({email})
            
            if(!user) {
                return res.status(400).send({"error": 'Senha ou E-mail Incorretos'})
            }

            const validPass = await bcrypt.compare(password, user.password)

            if(!validPass) {
                return res.status(400).send({"error": 'Senha ou E-mail Incorretos'})
            }

            const jwtPayload = {
                id: user.id
            }

            const token = jwt.sign(jwtPayload, process.env.TOKEN_PASS ?? '', {expiresIn: '8h'})

            const {password:_, ...userData } = user

            return res.send({
                'token': token,
                'user': userData
            })
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno do servidor",
                status: 500,
            });
        }
    }

    async teste(req:Request, res:Response) {
        try {
            res.send("prikito")
        } catch (error) {
            return res.status(500).json({
                message: "Erro interno do servidor",
                status: 500,
            });
        }
    }
}