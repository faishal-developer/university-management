import status from 'http-status'
import { Schema, model } from 'mongoose'
import ApiError from '../../../error/ApiError'
import {
  academiSemesterCode,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'
import {
  AcademicSemeterModel,
  TAcademicSemester,
} from './academicSemister.interface'

const academicSemesterSchema = new Schema<TAcademicSemester>({
  title: {
    type: String,
    required: true,
    enum: academicSemesterTitles,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: academiSemesterCode,
  },
  startMonth: {
    type: String,
    required: true,
    enum: academicSemesterMonths,
  },
  endMonth: {
    type: String,
    required: true,
    enum: academicSemesterMonths,
  },
})
//first i have to finish all kind of work of schema then we define model
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(
      status.CONFLICT,
      'Academic semester is already is exist!',
    )
  }
  //this next is not from express but this is from mongoose hook;
  next()
})

export const AcademicSemester = model<TAcademicSemester, AcademicSemeterModel>(
  'AcademicSemester',
  academicSemesterSchema,
)
