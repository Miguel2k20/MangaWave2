import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { userRepository } from "../repositories/userRepository";

type jwtPayload = {
    id: number
}

export const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {

    try {
        const { authorization } = req.headers

        if(!authorization) {
            res.status(400).send({"error": 'Usuário não autenticado'})
            return
        }

        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, process.env.TOKEN_PASS ?? '') as jwtPayload

        const user = await userRepository.findOneBy({id})

        if (!user) {
            res.status(400).send({"error": 'Usuário não autenticado'})
            return
        }

        const { password, ...userData } = user

        req.user = userData

        next()
        
    } catch (error) {
        if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
            res.status(401).json({ error: 'Token expirado' });
            return
        }
        res.status(500).json({
            message: "Erro interno do servidor",
            status: 500,
        });
    }
    
}