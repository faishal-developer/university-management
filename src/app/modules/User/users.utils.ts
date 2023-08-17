import { TAcademicSemester } from '../academicSemister/academicSemister.interface'
import { User } from './user.model'

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}

export const generateStudentId = async (
  academicSemester: TAcademicSemester | null,
): Promise<string> => {
  const currentId = await (findLastStudentId() || 0).toString().padStart(5, '0')
  let incrementedId = parseInt(currentId + 1)
    .toString()
    .padStart(5, '0')

  incrementedId = `${academicSemester?.year.substring(
    2,
  )}${academicSemester?.code}${incrementedId}`
  return incrementedId
}

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastFaculty?.id ? lastFaculty?.id.substring(2) : ''
}

export const generateFacultyId = async (): Promise<string> => {
  const currentId = await (findLastFacultyId() || 0).toString().padStart(5, '0')
  let incrementedId = parseInt(currentId + 1)
    .toString()
    .padStart(5, '0')

  incrementedId = `F-${incrementedId}`
  return incrementedId
}
