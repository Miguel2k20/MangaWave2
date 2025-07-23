import { NextFunction, Router, Response, Request } from "express"
import { UserController } from "./controllers/UserController"
import { authMiddleware } from "./middlewares/authMiddleware"

const router = Router()

router.post('/user', (req:Request, res:Response) => { new UserController().create(req, res) })
router.post('/login', (req:Request, res:Response) => { new UserController().login(req, res) })

router.use(authMiddleware as (req: Request, res: Response, next: NextFunction) => void)
router.post('/teste', (req:Request, res:Response) => { new UserController().teste(req, res) })

export default router