import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../error/ApiError'
import { AcademicSemester } from '../academicSemister/academicSemester.Model'
// import { IStudent } from '../student/student.interface'
// import { Student } from '../student/student.schema'
import { IStudent } from '../student/student.interface'
import { Student } from '../student/student.schema'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './users.utils'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_pass as string
  }
  user.role = 'student'
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  )
  // const createdUser = await User.create(user)

  let newUserAllData = null
  //transaction and rollback implemented here. Multiple operation will work as a unite.
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id

    //array
    const newStudent = await Student.create([student], { session })
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }
  return newUserAllData
}

export const UserService = {
  createStudent,
}
