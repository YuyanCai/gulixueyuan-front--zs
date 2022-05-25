import request from '@/utils/request'
export default {
  //1 课程分类列表
  getSubjectList() {
    return request({
      url: '/eduService/subject/getAllSubject',
      method: 'get'
    })
  },
  //2 添加课程分类
  addSubject(file){
    return request({
      url:`/eduService/subject/addSubject`,
      method: 'post'
    })
  }
}
