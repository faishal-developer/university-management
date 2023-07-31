import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import userRouter from './app/User/user.route'
import errorHandler from './app/middleWares/GlobalErrorHandlers'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/users', userRouter)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  next('error khaicere')
})

app.use(errorHandler)
export default app
