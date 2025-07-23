import { Router } from "express"
import { Request, Response } from "express"
import { UserController } from "./controllers/UserController"

const router = Router()

router.post('/user', (req:Request, res:Response) => { new UserController().create(req, res) })
router.post('/login', (req:Request, res:Response) => { new UserController().login(req, res) })

export default router