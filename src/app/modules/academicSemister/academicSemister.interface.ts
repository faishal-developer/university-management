import { Model } from 'mongoose'

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemesterTitles = 'Autum' | 'Summer' | 'Fall'
export type IAcademicSemesterCodes = '01' | '02' | '03'

export type TAcademicSemester = {
  title: IAcademicSemesterTitles
  year: string
  code: IAcademicSemesterCodes
  startMonth: IAcademicSemesterMonths
  endMonth: IAcademicSemesterMonths
}

export type AcademicSemeterModel = Model<TAcademicSemester>

export type IAcademicSemesterFilters = {
  searchTerm: string
  title: string
  code: string
  year: string
}
