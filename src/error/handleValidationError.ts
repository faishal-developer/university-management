import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../interface/common'
import { IGenericErrorMessage } from '../interface/error'

type vError = mongoose.Error.ValidationError
const handleValidationError = (err: vError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    }
  })

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
