<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
	数据类型一定要和取出的json中的一致，否则没法回填
	因此，这里value使用动态绑定的值，保证其数据类型是number
    -->
          <el-option :value="0" label="普通讲师" />
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="超级讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>
        <!--
    v-show：是否显示上传组件
    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
    :url：后台上传的url地址@close：关闭上传组件
    @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/eduOss/fileOss/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
        <el-button @click="index()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import teacherApi from "@/api/edu/teacher";
//引用ImageCropper文件
import ImageCropper from "@/components/ImageCropper";
//引用PanThumb文件
import PanThumb from "@/components/PanThumb";
export default {
  components: { ImageCropper, PanThumb },
  //写核心代码的过程
  data() {
    //  定义变量和初始值
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: "",
      },
      BASE_API: process.env.BASE_API, //获取dev.env.js里边的地址
      imagecropperShow: false, //上传弹框组件是否显示
      imagecropperKey: 0, //上传组件的key值
      saveBtnDisabled: false, // 保存按钮是否禁用,
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      console.log("watch $route");
      this.init();
    },
  },
  methods: {
    close() {
      //关闭上传弹窗方法
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    cropSuccess(data) {
      //上传成功方法
      //上传之后的接口返回图片地址   将地址赋值给teacher中的avatar
      this.teacher.avatar = data.url;
      //关闭弹窗
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
    },

    init() {
      //页面渲染之前执行，一般调用methods里的方法
      if (this.$route.params && this.$route.params.id) {
        //从路径获取id值
        const id = this.$route.params.id;
        this.getInfo(id);
      } else {
        this.teacher = {};
      }
    },
    //根据讲师id查询的方法
    //因为teacher做了双向绑定，所以获取值后，就会回显数据
    getInfo(id) {
      teacherApi.getTeacherInfo(id).then((response) => {
        this.teacher = response.data.teacher;
      });
    },

    saveOrUpdate() {
      //判断是修改还是添加
      //根据teacher是否有id
      if (!this.teacher.id) {
        //添加讲师方法
        this.saveTeacher();
      } else {
        //修改讲师方法
        this.updateTeacher();
      }
    },
    //添加讲师方法
    saveTeacher() {
      teacherApi.addTeacher(this.teacher).then((response) => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //回到列表页面  路由跳转
        this.$router.push({ path: "/edu/teacher/list" });
      });
    },
    // 返回主页方法
    index() {
      this.$router.push({ path: "/dashboard" });
    },
    // 修改讲师方法
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //回到列表页面  路由跳转
        this.$router.push({ path: "/teacher/table" });
      });
    },
  },
};
</script>