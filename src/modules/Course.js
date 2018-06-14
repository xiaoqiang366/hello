import StudentList from './StudentList'

class Course {
  constructor (name) {
    this.name = name
    this.StudentList = new StudentList()
  }

  // 添加
  add (student) {
    this.StudentList.add(student)
    return this
  }

  // 移出
  remove (name) {
    this.StudentList.remove(name)
    return this
  }

  // 获取订阅者个数
  getStudentNumbers () {
    return this.StudentList.getStudentNumbers()
  }

  // 课程通知
  notify (...args) {
    const { students: observers } = this.StudentList
    observers.forEach(ob => {
      ob.handleCourseNotice(...args)
    })
  }

  // 获取课程
  get (name) {
    return this.StudentList.get(name)
  }
}

export default Course
