import { ErrorRequestHandler } from 'express'
import config from '../../config/index'
import ApiError from '../../error/ApiError'
import handleValidationError from '../../error/handleValidationError'
import { IGenericErrorResponse } from '../../interface/common'
import { IGenericErrorMessage } from '../../interface/error'

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  let statusCode: number = 500
  let message: string = 'Something happend wrong!'
  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError: IGenericErrorResponse = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.enviornment !== 'production' ? err?.stack : undefined,
  })
}

export default errorHandler
