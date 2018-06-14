<template>
  <div id="app" class="container">
    <el-row type="flex" align="middle" justify="center" class="total-info">
      <h2>观察者模式(目标 - 观察者)</h2>
    </el-row>
    <el-row type="flex" align="middle" class="total-info">
      <el-col :span="24">
        <span>目标数: {{courses.length}}</span> / <span>订阅者数: {{students.length}}</span>
      </el-col>
    </el-row>

    <!-- 课程(目标)信息列表 -->
    <div class="info-list-box">
      <el-row class="list-main-title" type="flex" align="middle" justify="space-between">
        课程列表(目标)<el-button type="danger" size="small" icon="el-icon-news" @click="addObject('c')">添加课程</el-button>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8" v-for="(course, index) in courses" :key="index" >
          <el-card shadow="hover" class="info-card">
            <div slot="header" class="clearfix header-line">
              <span>课程:{{course.name}}</span>
              <div class="subcribe-tip">订阅者( <span class="sub-total">{{course.StudentList.students.length}}人订阅 )</span></div>
              <el-tooltip class="item" effect="dark" :content=" '发送 “' + course.name + '” 课程通知'" placement="top">
                <el-button @click="publishNotice(course)" class="btn-notice el-icon-upload" size="mini" type="danger" circle></el-button>
              </el-tooltip>
            </div>
            <div class="learners">
              <div v-for="(student, sindex) in course.StudentList.students" :key="sindex">{{student.name}}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 学生(观察者)信息列表 -->
    <div class="info-list-box">
      <el-row class="list-main-title" type="flex" align="middle" justify="space-between">
        订阅者列表(观察者)<el-button type="primary" size="small" icon="el-icon-view" @click="addObject('s')">添加学生</el-button>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8" v-for="(student, index) in students" :key="index" >
          <el-card shadow="hover" class="info-card student-card">
            <el-dropdown size="medium" class="btn-notice" @command="subscribeCourse">
              <span class="demonstration">订阅课程<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{student, course}" v-for="(course, cindex) in courses" :key="cindex">{{course.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-tooltip class="item" effect="dark" content="清除消息记录" placement="top">
              <el-button @click="clearMessage(student)" class="btn-clear-message el-icon-delete" size="mini" type="info" circle></el-button>
            </el-tooltip>
            <div class="c-name">
              <el-badge :hidden="student.message.length == 0" :value="student.message.length" class="item-badge">
                学生: {{student.name}}
              </el-badge>
            </div>
            <div>
              <div class="c-tag-line">
                <el-tag class="c-tag" size="small" v-for="(course, cindex) in student.course" :key="cindex" @close="unSubcribe(student, course)" closable>{{course}}</el-tag>
              </div>
              <div class="message-text" v-if="student.message.length > 0" v-for="message in student.message" :key="message.t">
                <i class="el-icon-bell msg-color"></i> [{{forMateTimestamps(message.t)}}]{{message.msg}}
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Course from './modules/Course'
import Student from './modules/Student'

export default {
  name: 'app',
  components: {},
  data () {
    return {
      courses: [],
      students: [],
      cols: [],
      form: {
        type: []
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 时间格式化
    forMateTimestamps (t) {
      const time = new Date(t)
      return ` ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${time.getMilliseconds()} `
    },
    // 初始化数据
    initData () {
      this.courses = [new Course('JavaScript'), new Course('HTML'), new Course('CSS')]
      const s1 = new Student('张小明', function (data) {
        this.message.unshift({
          t: new Date().getTime(),
          msg: data
        })
      })
      const s2 = new Student('哈哈', function (data) {
        this.message.unshift({
          t: new Date().getTime(),
          msg: data
        })
      })
      const s3 = new Student('小强', function (data) {
        this.message.unshift({
          t: new Date().getTime(),
          msg: data
        })
      })

      s1.subscribe(this.courses[0]).subscribe(this.courses[2])
      s2.subscribe(this.courses[0]).subscribe(this.courses[1])
      s3.subscribe(this.courses[0]).subscribe(this.courses[1]).subscribe(this.courses[2])
      this.students = [s1, s2, s3]
    },
    // 订阅课程
    subscribeCourse (data) {
      const { student, course } = data
      student.subscribe(course)
    },
    // 取消订阅课程
    unSubcribe (stu, cname) {
      this.courses.forEach(c => {
        if (cname === c.name) {
          stu.unSubscribe(c)
        }
      })
    },
    clearMessage (student) {
      student.clearMessage()
    },
    // 发布课程通知
    publishNotice (course) {
      const randomMessage = ['更新啦', '有新的课程哦~~', '需要你完成的练习搞定了吧', '周报写了吗？？']
      course.notify(`课程消息: “${course.name}”${randomMessage[Math.random() * randomMessage.length >> 0]}`)
    },
    // 添加课程或者学生
    addObject (type = 'c') {
      let addType = 'courses'
      let msg = '课程'
      if (type === 's') {
        addType = 'students'
        msg = '学生'
      }
      this.openInputBox(`请输入要添加的${msg}名称`, `${msg}添加提示`).then(value => {
        if (!value) return
        value = value.trim()
        const filter = this[addType].some(course => {
          return course.name === value
        })
        if (filter) {
          this.$notify({
            title: '警告',
            message: `${msg} “${value}” 已经存在，不要重复添加哦~`,
            duration: 2000,
            type: 'warning'
          })
          return
        }

        let pushData = new Course(value)
        if (type === 's') {
          pushData = new Student(value, function (data) {
            this.message.unshift({
              t: new Date().getTime(),
              msg: data
            })
          })
        }
        this[addType].push(pushData)
      })
    },
    // 打开prompt输入框
    openInputBox (title = '', tip = '提示') {
      return this.$prompt(title, tip, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '课程名称不能为空哦',
        roundButton: true
      }).then(({ value }) => {
        return value
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="less">
.container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto 0;
  max-width: 1004px;
  .total-info {
    height: 30px;
  }

  .info-list-box {
    margin-top: 20px;
    .list-main-title {
      height: 60px;
      font-weight: 500;
      font-size: 18px;
    }
    .info-card {
      margin-bottom: 10px;
      height: 200px;
      overflow: scroll;
      position: relative;
      &.student-card {
        height: 280px;
      }
      .el-card__header {
        padding: 10px 20px;
      }

      .btn-notice {
        position: absolute;
        right: 15px;
        top: 15px;
      }
      .btn-clear-message {
        position: absolute;
        right: 15px;
        bottom: 15px;
      }

      .item-badge {
        .el-badge__content {
          opacity: .8;
          right: 5px;
        }
      }
    }
    .subcribe-tip {
      font-size: 12px;
    }

    .c-name {
      font-weight: 500;
    }
    .c-tag-line {
      padding: 10px 0;
      .c-tag {
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
    .student-line {
      padding: 10px 0;
    }
    .message-text {
      margin: 5px 0;
      font-size: 12px;
    }

    .msg-color {
      color: #E6A23C;
      font-weight: 700;
    }
  }
}
</style>
