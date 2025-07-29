import { Router } from "express"
import { UserCreateController } from "./controllers/User/UserCreateController"
import { authMiddleware } from "./middlewares/authMiddleware"
import { MangaController } from "./controllers/Mangadex/MangaController"
import { ChapterController } from "./controllers/Mangadex/ChapterController"
import { UserLoginController } from "./controllers/User/UserLoginController"

const router = Router()

// Rotas sem autenticação
router.post('/user', new UserCreateController().handle)
router.post('/login', new UserLoginController().handle)

// router.use(authMiddleware)

// Criando instâncias dos controllers
const mangaController = new MangaController();
const chapterController = new ChapterController();

router.get('/manga', mangaController.handle.bind(mangaController))
router.get('/chapter/:mangaId/:language', chapterController.handle.bind(chapterController))

export default router