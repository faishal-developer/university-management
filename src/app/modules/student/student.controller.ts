import { Request, Response } from 'express'
import { default as httpStatus } from 'http-status'
import { paginationFields } from '../../../constant/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { studentFilterableFields } from './student.constant'
import { IStudent, IStudentFilters } from './student.interface'
import { StudentService } from './student.service'

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await StudentService.getSingleStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrived successfully',
    data: result,
  })
})

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await StudentService.getAllStudents(
    filters as IStudentFilters,
    paginationOptions,
  )

  sendResponse<IStudent[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All students retrived successfully!',
    data: result.data,
  })
})

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await StudentService.updateStudent(id, updatedData)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated succefully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await StudentService.deleteStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully!',
    data: result,
  })
})

export const studentController = {
  getSingleStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
}
