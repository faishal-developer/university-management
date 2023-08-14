import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import status from 'http-status'
import errorHandler from './app/middleWares/GlobalErrorHandlers'
import routes from './app/routes/index'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/v1', routes)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  next('error khaicere')
})

//handle not found
app.use((req: Request, res: Response) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  })
})

app.use(errorHandler)
export default app
