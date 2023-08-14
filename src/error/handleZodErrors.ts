import { ZodError } from 'zod'
import { IGenericErrorResponse } from '../interface/common'
import { IGenericErrorMessage } from '../interface/error'

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map(issue => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  }
}

export default handleZodError
