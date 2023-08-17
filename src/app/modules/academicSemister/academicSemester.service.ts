import { default as httpStatus, default as status } from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../error/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPaginationOptions } from '../../../interface/Pagination'
import { IGenericResponse } from '../../../interface/common'
import { AcademicSemester } from './academicSemester.Model'
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
import {
  IAcademicSemesterFilters,
  TAcademicSemester,
} from './academicSemister.interface'

const createSemester = async (
  payload: TAcademicSemester,
): Promise<TAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getSingleSemester = async (
  id: string,
): Promise<TAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<TAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  // const andConditions=[
  //     {
  //         $or:[
  //             {title:{
  //                 $regex:searchTerm,
  //                 $options:'i'
  //             }},
  //             {
  //                 code:{
  //                     $regex:searchTerm,
  //                     $options:'i',
  //                 }
  //             },
  //             {
  //                 year:{
  //                     $regex:searchTerm,
  //                     $options:'i',
  //                 }
  //             }
  //         ]
  //     }
  // ]
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortContitions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortContitions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortContitions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>,
): Promise<TAcademicSemester | null> => {
  //we should always use findOne And  Update
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid statements')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteSemester = async (
  id: string,
): Promise<TAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
