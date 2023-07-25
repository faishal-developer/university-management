import { Request, Response } from 'express'
import userService from './user.service'

export const creatUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: 'Failed to create User',
    })
  }
}

export default {
  creatUser,
}
