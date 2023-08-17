import express from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { academicSemisterRoute } from '../modules/academicSemister/academicSemester.route'
import { StudentRoutes } from '../modules/student/student.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemisterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})
export default router
