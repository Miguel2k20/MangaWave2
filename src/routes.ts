import { NextFunction, Router, Response, Request } from "express"
import { UserController } from "./controllers/UserController"
import { authMiddleware } from "./middlewares/authMiddleware"
import { MangadexApi } from "./controllers/MangadexApi"

const router = Router()

router.post('/user', (req:Request, res:Response) => { new UserController().create(req, res) })
router.post('/login', (req:Request, res:Response) => { new UserController().login(req, res) })

router.use(authMiddleware as (req: Request, res: Response, next: NextFunction) => void)
router.get('/manga', (req:Request, res:Response) => { new MangadexApi().fetchMangasByName(req, res) })

export default router