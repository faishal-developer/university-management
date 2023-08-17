import express from 'express'
// import { ENUM_USER_ROLE } from '../../../enums/users';
import validateRequest from '../../middleWares/validateRequests'
// import auth from '../../middlewares/auth';
import { AcademicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validations'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.createDepartment,
)

router.get('/:id', AcademicDepartmentController.getSingleDepartment)

router.get('/', AcademicDepartmentController.getAllDepartments)

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.updateDepartment,
)

router.delete(
  '/:id',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.deleteDepartment,
)

export const AcademicDepartmentRoutes = router
