import request from '@/utils/request'
export default {
    //1 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduService/course/addCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },

    //2 查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduService/teacher/findAll',
            method: 'get'
        })
    },
    //分页多条件查询课程
    pageCourseCondition(current, limit, CourseQuery){
        return request({
            url: `/eduService/course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            data: CourseQuery
        })
    },
    //根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: '/eduService/course/getCourseInfo/' + id,
            method: 'get'
        })
    },
    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduService/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },
    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduService/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },

    //课程确认信息显示
    getPublihCourseInfo(id) {
        return request({
            url: '/eduService/course/getPublishCourseInfo/' + id,
            method: 'get'
        })
    },

    //课程最终发布
    publihCourse(id) {
        return request({
            url: '/eduService/course/publishCourse/' + id,
            method: 'post'
        })
    },

    //TODO 课程列表
    //课程最终发布
    getListCourse() {
        return request({
            url: '/eduService/course/findAll',
            method: 'get'
        })
    },

    deleteCourseById(id){
        return request({
            url:'/eduService/course/deleteCourse/'+id,
            method: 'delete'
        })
    }

}
