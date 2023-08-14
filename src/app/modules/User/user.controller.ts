import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'

const creatUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body
  const result = await UserService.createUser(user)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user created successfully',
    data: result,
  })
})

export const UserController = {
  creatUser,
}
