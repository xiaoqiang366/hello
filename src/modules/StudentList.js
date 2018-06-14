class StudentList {
  constructor () {
    this.students = []
  }

  // 添加
  add (student) {
    this.students.push(student)
  }

  // 移出
  remove (name) {
    this.students = this.students.filter(stu => {
      return stu.name !== name
    })
  }

  // 获取
  get (name) {
    const filteredStu = this.filter((student, i, students) => {
      return name === student.name
    })
    return filteredStu[0]
  }

  // 获取订阅者个数
  getStudentNumbers () {
    return this.students.length
  }

  // 过滤查询
  filter (rule) {
    return this.students.map(rule)
  }
}

export default StudentList
