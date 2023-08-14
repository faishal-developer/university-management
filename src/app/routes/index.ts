import express from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { academicSemisterRoute } from '../modules/academicSemister/academicSemester.route'
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
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})
export default router
