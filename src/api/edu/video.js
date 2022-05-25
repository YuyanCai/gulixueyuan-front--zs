import request from '@/utils/request'
export default {

    //添加小节
    addVideo(video) {
        return request({
            url: '/eduService/video/addVideo',
            method: 'post',
            data: video
          })
    },
    
    //删除小节
    deleteVideo(id) {
        return request({
            url: '/eduService/video/'+id,
            method: 'delete'
          })
    },
    
    //修改小节
    updateVideo(){
        return request({
            url:'/eduService/video/updateVideo',
            methods:'post'
        })
    },
    
    //删除视频
    deleteAliyunvod(id) {
        return request({
            url: '/eduVod/video/removeAliYunVideo/' + id,
            method: 'delete'
        })
    },
}