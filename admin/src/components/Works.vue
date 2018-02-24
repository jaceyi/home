<template>
  <div>
    <div class="head">
      <span>作品管理</span>
      <el-button
      class="addWorks"
      type="primary"
      icon="el-icon-plus"
      @click="handleClickAdd">添加作品</el-button>
    </div>
    <el-table
      :data="worksList"
      style="width: 100%">
      <el-table-column
        label="头图"
        width="80">
        <template slot-scope="scope">
          <img class="img" :src="scope.row.imgSrc" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="startDate"
        label="开始时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="结束时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="link"
        label="链接"
        width="160">
        <template slot-scope="scope">
          <a :href="'//' + scope.row.link" alt="">{{ scope.row.link }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row.id)">编 辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.id)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
    title="添加作品"
    :visible.sync="addLayer"
    width="800px">
      <el-form :model="addContent">
        <el-form-item>
          <label class="label">
            <span>昵称</span>
            <el-input
            v-model="addContent.name"
            class="input"></el-input>
          </label>
          <label class="label">
            <span>链接</span>
            <el-input
            v-model="addContent.link"
            class="input"></el-input>
          </label>
        </el-form-item>
        <el-form-item>
          <label class="label">
            <span>类型</span>
            <el-select v-model="addContent.type" placeholder="请选择">
              <el-option
                v-for="item in itemTypeList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </label>
          <label class="label">
            <span>时间</span>
            <el-date-picker
              v-model="addContent.startDate"
              type="date"
              placeholder="开始时间"
              class="date">
            </el-date-picker> -
            <el-date-picker
              v-model="addContent.endDate"
              type="date"
              placeholder="结束时间"
              class="date">
            </el-date-picker>
          </label>
        </el-form-item>
        <el-form-item label="头图">
          <div class="avatar-uploader">
            <input type="file" v-on:change="handleUploadChange">
            <img
            v-if="addImgResult"
            class="img"
            :src="addImgResult">
            <i
            v-else-if="!addContent.img"
            class="el-icon-plus"></i>
          </div>
          <div class="title">
            图片最大大小1M
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLayer = false">取 消</el-button>
        <el-button type="primary" @click="addWorks">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Works',
  data () {
    return {
      addLayer: false,
      worksList: [
        {
          name: '百度',
          link: 'baidu.com',
          imgSrc: '',
          type: '项目',
          startDate: '2018-2-1',
          endDate: '2018-3-1'
        }
      ],
      itemTypeList: [
        '项目',
        '游戏'
      ],
      addContent: {
        name: '',
        link: '',
        imgFile: {},
        type: '',
        startDate: '',
        endDate: ''
      },
      addImgResult: ''
    }
  },
  methods: {
    handleUploadChange (e) {
      const file = e.target.files[0]
      const size = file.size
      if (!((size / 1024 / 1024) < 1)) {
        this.$message({
          message: '图片过大',
          type: 'warning'
        })
        return
      }
      const obj = new FileReader()
      obj.readAsDataURL(file)
      obj.onload = () => {
        this.addImgResult = obj.result
        this.addContent.imgFile = file
      }
    },
    handleClickAdd () {
      this.addLayer = true
      this.addImgResult = ''
      this.addContent = {
        name: '',
        link: '',
        imgFile: {},
        type: '',
        startDate: '',
        endDate: ''
      }
    },
    handleEdit () {

    },
    handleDelete () {

    },
    addWorks () {
      const addContent = this.addContent
      const {
        name,
        type,
        startDate,
        endDate,
        link,
        imgFile
      } = addContent
      if (!name || !type || !startDate || !endDate) {
        this.$message({
          message: '请将内容填写完整',
          type: 'warning'
        })
        return
      }
      let formData = new FormData()
      formData.append('name', name)
      formData.append('type', type)
      formData.append('startDate', startDate)
      formData.append('endDate', endDate)
      formData.append('link', link)
      formData.append('imgFile', imgFile)
      this.$http.post(this.$apis.setWorks, formData, {headers: {'Content-type': 'multipart/form-data'}})
        .then(
          (data) => {
            const o = data.body
            if (o.code === 200) {
              this.$message({
                message: o.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: o.msg,
                type: 'warning'
              })
            }
          },
          (data) => {
            console.log(data)
            this.$message({
              message: '404',
              type: 'warning'
            })
          }
        )
    }
  },
  mounted () {
    this.$http.get(this.$apis.getWorks)
      .then(
        (data) => {
          const o = data.body
          if (o.code === 200) {
            const worksList = o.data
            if (worksList.length) {
              this.worksList = worksList
            }
          } else {
            this.$message({
              message: o.msg,
              type: 'warning'
            })
          }
        },
        (data) => {
          console.log(data)
          this.$message({
            message: '404',
            type: 'warning'
          })
        }
      )
  }
}
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #DDD;
  padding-bottom: 10px;
  margin-bottom: 10px;

  span {
    font-size: 18px;
    font-weight: 600;
  }
}

$witdh: 120px;

.avatar-uploader {
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-width: $witdh;
  height: $witdh;

  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    display: block;
    position: relative;
    z-index: 2;
  }

  .el-icon-plus {
    position: absolute;
    left: 0;
    top: 0;
    min-width: 100%;
    height: 100%;
    line-height: $witdh;
    text-align: center;
    font-size: 20px;
  }

  .img {
    position: absolute;
    left: 0;
    top: 0;
    width: auto;
    height: 100%;
  }

  &:hover {
    border-color: #409EFF;
  }
}

.title {
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: $witdh;
  margin-left: 10px;
  color: crimson;
}

.label {
  margin-right: 50px;
  span {
    margin-right: 10px;
  }
}

.el-form-item__content {
  .input {
    width: 215px;
  }

  .date {
    width: 150px;
  }
}
</style>
