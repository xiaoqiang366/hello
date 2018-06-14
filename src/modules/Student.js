class Student {
  constructor (name, func = null) {
    this.name = name
    this.course = []
    this.handleCourseNotice = func
    this.message = []
  }

  // 订阅(获取到当前课程的所有订阅者, 如果没有订阅则添加订阅)
  subscribe (course) {
    const { students: subscribers } = course.StudentList
    const hasSub = subscribers.some((sub) => {
      return sub.name === this.name
    })
    if (!hasSub) {
      course.add(this)
      this.course.push(course.name)
    }
    return this
  }

  // 退订(获取到当前课程的所有订阅者, 如果已经订阅则取消订阅)
  unSubscribe (course) {
    let { students: subscribers } = course.StudentList
    const hasSub = subscribers.some((sub) => {
      return sub.name === this.name
    })
    console.log('course')
    console.log(this.name)
    console.log(course)
    if (hasSub) {
      course.remove(this.name)
      this.course = this.course.filter(c => {
        return c !== course.name
      })
    }
    return this
  }

  // 清除消息
  clearMessage () {
    this.message = []
  }
}

export default Student
