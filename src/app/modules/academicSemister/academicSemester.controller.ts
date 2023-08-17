import { Request, Response } from 'express'
import { default as httpStatus, default as status } from 'http-status'
import { paginationFields } from '../../../constant/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { AcademicSemesterService } from './academicSemester.service'
import {
  IAcademicSemesterFilters,
  TAcademicSemester,
} from './academicSemister.interface'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData,
  )
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semester is created successfully!',
    data: result,
  })
})

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.getSingleSemester(id)

  sendResponse<TAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrived successfully',
    data: result,
  })
})

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year'])
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicSemesterService.getAllSemesters(
    filters as IAcademicSemesterFilters,
    paginationOptions,
  )

  sendResponse<TAcademicSemester[]>(res, {
    statusCode: 200,
    success: true,
    message: 'All semesters retrived successfully!',
    data: result.data,
  })
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await AcademicSemesterService.updateSemester(id, updatedData)

  sendResponse<TAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated succefully',
    data: result,
  })
})

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.deleteSemester(id)

  sendResponse<TAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully!',
    data: result,
  })
})

export const academicSemesterController = {
  createSemester,
  getSingleSemester,
  getAllSemesters,
  updateSemester,
  deleteSemester,
}
