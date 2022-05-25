<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <!-- v-mode双向绑定条件封装对象teacherQuery -->
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="teacherQuery.level"
          clearable
          placeholder="讲师头衔"
        >
          <el-option :value="0" label="普通讲师" />
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="超级讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- prop是属性值
    ===即判断值又判断类型
    我们只要把值传进去，属性值对上elementui就会自动帮我们遍历
     -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="name" label="讲师姓名" width="180"></el-table-column>
      <el-table-column prop="career" label="讲师资历"> </el-table-column>
      <el-table-column label="头衔">
        <template slot-scope="scope">
          {{
            scope.row.level === 0
              ? "普通讲师"
              : scope.row.level === 1
              ? "高级讲师"
              : "超级讲师"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <!-- scope代表整个表格,可以通过scope来获取id，因为我们是通过id来删除 -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 冒号是单向绑定 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      background layout="total, prev, pager, next, jumper"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      @current-change="getList"
    >
    </el-pagination>
  </div>
</template>



<script>
import teacher from "@/api/edu/teacher";
export default {
  //写核心代码的过程
  data() {
    //  定义变量和初始值
    return {
      list: null, //查询之后接口返回集合
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数
      teacherQuery: {}, //条件封装对象
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods里的方法
    this.getList();
  },
  methods: {
    //创建具体方法，调用teacher.js定义的方法
    //讲师列表的方法
    //page = 1 为默认值，elementui帮我们封装了单击事件，你单击几就传几
    getList(page = 1) {
      this.page = page;
      //注意这里的this指的是当前页面也就是我们在data中定义的初始值传给这个方法
      teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((response) => {
          // console.log(this.response);
          //response代表接口返回的数据
          this.list = response.data.rows;
          this.total = response.data.total;
          console.log(this.list)
        })
        .catch((error) => {
          // console.log(error);
          console.log(error);
        });
    },
    resetData() {
      //清空的方法
      //表单输入项数据清空
      //因为是双向绑定，我们多条件查询的时候通过把表单条件传给teacherQuery()
      //那么把表单清空，就给teacher传入为空即可
      this.teacherQuery = {};
      //查询所有讲师数据
      this.getList();
    },

    // 删除讲师的方法
    removeDataById(id) {
      this.$confirm("此操作将永久删除讲师信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          teacher.deleteTeacherId(id)
            .then(response=>{
              this.$message({
              type: "success",
              message: "删除成功!",
              });
              //回到列表页面
              this.getList()
            })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>