import { Router } from "express"
import { ApiCustomErros } from "./helpers/ApiCustomErros"

const router = Router()

router.get('/', (req, res) => {
    throw new ApiCustomErros("Teste de erro", 404)
    // res.send('Fuck.')
})

export default router