import { Router } from "express"
import { UserCreateController } from "./controllers/User/UserCreateController"
import { authMiddleware } from "./middlewares/authMiddleware"
import { MangaController } from "./controllers/Mangadex/MangaController"
import { ChapterController } from "./controllers/Mangadex/ChapterController"
import { UserLoginController } from "./controllers/User/UserLoginController"

const router = Router()

router.post('/user', new UserCreateController().handle)
router.post('/login', new UserLoginController().handle)

// router.use(authMiddleware)
router.get('/manga', new MangaController().handle)
router.get('/chapter/:mangaId/:language', new ChapterController().handle)

export default router