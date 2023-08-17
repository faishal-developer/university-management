import express from 'express'
import validateRequest from '../../middleWares/validateRequests'
import { studentController } from './student.controller'
import { StudentValidaion } from './student.validation'

const router = express.Router()

router.get('/:id', studentController.getSingleStudent)
router.get('/', studentController.getAllStudents)
router.delete('/:id', studentController.deleteStudent)
router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  studentController.updateStudent,
)

export const StudentRoutes = router
