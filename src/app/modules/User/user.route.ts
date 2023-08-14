import express from 'express'
import validateRequest from '../../middleWares/validateRequests'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.creatUser,
)

export const UserRoutes = router
