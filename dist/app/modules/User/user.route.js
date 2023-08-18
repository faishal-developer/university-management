'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserRoutes = void 0
const express_1 = __importDefault(require('express'))
const validateRequests_1 = __importDefault(
  require('../../middleWares/validateRequests'),
)
const user_controller_1 = require('./user.controller')
const user_validation_1 = require('./user.validation')
const router = express_1.default.Router()
router.post(
  '/create-student',
  (0, validateRequests_1.default)(
    user_validation_1.UserValidation.createStudentZodSchema,
  ),
  user_controller_1.UserController.creatStudent,
)
exports.UserRoutes = router
