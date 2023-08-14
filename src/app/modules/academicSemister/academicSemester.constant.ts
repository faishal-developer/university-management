import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemister.interface'

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autum',
  'Summer',
  'Fall',
]

export const academiSemesterCode: IAcademicSemesterCodes[] = ['01', '02', '03']

export const academicSemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Autum: '01',
  Summer: '02',
  Fall: '03',
}

export const academicSemesterSearchableFields = ['title', 'code', 'year']
