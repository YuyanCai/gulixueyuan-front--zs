// 引入axios
import request from '@/utils/request'

export default {
    //current 当前页    limit 每页记录数    teacherQuery 条件对象
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            url: `/eduService/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //后端使用requestbody来获取数据
            //requestbody的意思是我们要以json的形式传数据
            // data的意思就是把对象转化为json传递到接口里面
            data: teacherQuery
        })
    },
    deleteTeacherId(id) {
        return request({
            url: `/eduService/teacher/${id}`,
            method: 'delete'
        })
    },
    addTeacher(teacher) {
        return request({
            url: `/eduService/teacher/addTeacher`, 
            method: 'post', 
            // data会把teacher转为为json传给接口
            data: teacher
        })
    },
    getTeacherInfo(id){
        return request({
            url: `/eduService/teacher/getTeacher/${id}`,
            method: `get`
        })
    },
    updateTeacherInfo(teacher) {
        //根据id修改讲师信息
        return request({
            url: `/eduService/teacher/updateTeacher`, 
            method: 'post',
            data: teacher
        })
    }
}
