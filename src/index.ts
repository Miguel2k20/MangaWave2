import { dataSource } from './data-source'
import Express from 'express'
import router from './routes'
dataSource.initialize().then(()=>{
    const app = Express()
    app.use(Express.json())
    app.use(router)
    app.listen(process.env.APP_PORT)
})