import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { userRepository } from "../repositories/userRepository";

type jwtPayload = {
    id: number
}

export const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {

    try {
        const { authorization } = req.headers

        if(!authorization) {
            return res.status(400).send({"error": 'Usuário não autenticado'})
        }

        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, process.env.TOKEN_PASS ?? '') as jwtPayload

        const user = await userRepository.findOneBy({id})

        if (!user) {
            return res.status(400).send({"error": 'Usuário não autenticado'})
        }

        const { password, ...userData } = user

        req.user = userData

        next()
        
    } catch (error) {
        return res.status(500).json({
            message: "Erro interno do servidor",
            status: 500,
        });
    }
    
}