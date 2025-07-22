import { dataSource } from './data-source'
import Express from 'express'
import router from './routes'
import { errorMiddleware } from './middlewares/error'
dataSource.initialize().then(()=>{
    const app = Express()
    app.use(Express.json())
    app.use(router)
    app.use(errorMiddleware)
    app.listen(process.env.APP_PORT)
})