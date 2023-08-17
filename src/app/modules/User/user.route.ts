import express from 'express'
import validateRequest from '../../middleWares/validateRequests'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.creatStudent,
)

export const UserRoutes = router
