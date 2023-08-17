import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import status from 'http-status'
import globalErrorHandler from './app/middleWares/GlobalErrorHandlers'
import routes from './app/routes/index'

const app: Application = express()

app.use(cors())
app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'everything working fine' })
})
app.use('/api/v1', routes)

app.use(globalErrorHandler)

//handle not found / unknow route
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

export default app
