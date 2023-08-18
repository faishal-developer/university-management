"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = __importDefault(require("../../middleWares/validateRequests"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validations_1 = require("./academicFaculty.validations");
const router = express_1.default.Router();
router.post('/create-faculty', (0, validateRequests_1.default)(academicFaculty_validations_1.AcademicFacultyValidation.createFacultyZodSchema), 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
academicFaculty_controller_1.AcademicFacultyController.createFaculty);
router.get('/:id', 
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY,
//   ),
academicFaculty_controller_1.AcademicFacultyController.getSingleFaculty);
router.get('/', 
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY,
//   ),
academicFaculty_controller_1.AcademicFacultyController.getAllFaculties);
router.patch('/:id', (0, validateRequests_1.default)(academicFaculty_validations_1.AcademicFacultyValidation.updatefacultyZodSchema), 
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY,
//   ),
academicFaculty_controller_1.AcademicFacultyController.updateFaculty);
router.delete('/:id', 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
academicFaculty_controller_1.AcademicFacultyController.deleteFaculty);
exports.AcademicFacultyRoutes = router;
