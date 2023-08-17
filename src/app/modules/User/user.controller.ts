import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'

const creatStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body
  const result = await UserService.createStudent(student, userData)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user created successfully',
    data: result,
  })
})

export const UserController = {
  creatStudent,
}
