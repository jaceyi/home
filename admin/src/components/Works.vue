<template>
  <div class="works">
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
        width="150">
        <template slot-scope="scope">
          <img class="table-img" :src="scope.row.imgSrc" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="type"
        label="项目类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="startDate"
        label="开始时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="结束时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="link"
        label="链接"
        width="150">
        <template slot-scope="scope">
          <a :href="'//' + scope.row.link" target="_blank" alt="">{{ scope.row.link }}</a>
        </template>
      </el-table-column>
      <el-table-column
        min-width="160"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleClickEdit(scope.$index)">编 辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleClickDelete(scope.$index, scope.row.id)">删 除</el-button>
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
              :editable="false"
              class="date">
            </el-date-picker> -
            <el-date-picker
              v-model="addContent.endDate"
              type="date"
              placeholder="结束时间"
              :editable="false"
              class="date">
            </el-date-picker>
          </label>
        </el-form-item>
        <el-form-item label="头图">
          <div class="avatar-uploader">
            <input type="file" v-on:change="handleAddUpload" accept="image/png,image/jpeg">
            <img
            v-if="addContent.imgSrc"
            class="img"
            :src="addContent.imgSrc">
            <i
            v-else-if="!addContent.imgSrc"
            class="el-icon-plus"></i>
          </div>
          <div class="title">
            <span>推荐尺寸 800px * 400px</span>
            <p>图片最大大小1M</p>
            <p>仅支持 jpeg/png 格式的图片</p>
            <div>
              <el-button
              type="danger"
              class="el-icon-delete"
              :disabled="!addContent.imgSrc"
              @click="handleClickAddDel"
              plain> 删除图片</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLayer = false">取 消</el-button>
        <el-button type="primary" @click="addWork">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog
    title="编辑作品"
    :visible.sync="editLayer"
    width="800px">
      <el-form :model="editContent">
        <el-form-item>
          <label class="label">
            <span>昵称</span>
            <el-input
            v-model="editContent.name"
            class="input"></el-input>
          </label>
          <label class="label">
            <span>链接</span>
            <el-input
            v-model="editContent.link"
            class="input"></el-input>
          </label>
        </el-form-item>
        <el-form-item>
          <label class="label">
            <span>类型</span>
            <el-select v-model="editContent.type" placeholder="请选择">
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
              v-model="editContent.startDate"
              type="date"
              placeholder="开始时间"
              :editable="false"
              class="date">
            </el-date-picker> -
            <el-date-picker
              v-model="editContent.endDate"
              type="date"
              placeholder="结束时间"
              :editable="false"
              class="date">
            </el-date-picker>
          </label>
        </el-form-item>
        <el-form-item label="头图" class="row">
          <div class="avatar-uploader">
            <input type="file" v-on:change="handleEditUpload" accept="image/png,image/jpeg">
            <img
            v-if="editContent.imgSrc"
            class="img"
            :src="editContent.imgSrc">
            <i
            v-else-if="!editContent.imgSrc"
            class="el-icon-plus"></i>
          </div>
          <div class="title">
            <span>推荐尺寸 800px * 400px</span>
            <p>图片最大大小1M</p>
            <p>仅支持 jpeg/png 格式的图片</p>
            <div>
              <el-button
              type="danger"
              class="el-icon-delete"
              :disabled="!editContent.imgSrc"
              @click="handleClickEditDel"
              plain> 删除图片</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editLayer = false">取 消</el-button>
        <el-button type="primary" @click="editWork">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Works',
  data () {
    return {
      page: 1,
      addLayer: false,
      editLayer: false,
      worksList: [],
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
        endDate: '',
        imgSrc: ''
      },
      editContent: {
        id: 0,
        name: '',
        link: '',
        imgFile: {},
        type: '',
        startDate: '',
        endDate: '',
        imgSrc: ''
      }
    }
  },
  methods: {
    handleAddUpload (e) {
      const file = e.target.files[0]
      this.uploadChange(file, (reader) => {
        this.addContent.imgSrc = reader.result
        this.addContent.imgFile = file
      })
    },
    handleEditUpload (e) {
      const file = e.target.files[0]
      this.uploadChange(file, (reader) => {
        this.editContent.imgSrc = reader.result
        this.editContent.imgFile = file
      })
    },
    handleClickAddDel () {
      this.addContent.imgSrc = ''
      this.addContent.imgFile = {}
    },
    handleClickEditDel () {
      this.editContent.imgSrc = ''
      this.editContent.imgFile = {}
    },
    uploadChange (file, cb) {
      const size = file.size
      const type = file.type
      if (type !== 'image/jpeg' && type !== 'image/png') {
        this.$message({
          message: '仅支持 jpeg/png 格式的图片',
          type: 'warning'
        })
        return
      }
      if (!((size / 1024 / 1024) < 1)) {
        this.$message({
          message: '图片过大',
          type: 'warning'
        })
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        cb(reader)
      }
    },
    handleClickAdd () {
      this.addLayer = true
      this.addContent = {
        name: '',
        link: '',
        imgFile: {},
        type: '',
        startDate: '',
        endDate: '',
        imgSrc: ''
      }
    },
    handleClickEdit (index) {
      const editWork = this.worksList[index]
      this.editLayer = true
      this.addImgResult = editWork.imgSrc
      this.editContent = {
        ...editWork
      }
    },
    handleClickDelete (index, id) {
      this.$confirm('此操作将永久删除该作品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(this.$apis.delWorks + '?id=' + id)
          .then(
            (data) => {
              const o = data.body
              if (o.code === 200) {
                const worksList = this.worksList
                this.worksList = this.deleteItem(worksList, index)
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
              this.hanbleFail(data)
            }
          )
      }).catch(() => {
        return false
      })
    },
    addWork () {
      const addContent = this.addContent
      const loading = this.$loading({
        lock: true,
        text: 'Loading'
      })
      this.submitWork(this.$apis.setWorks, addContent, (o) => {
        this.addLayer = false
        this.worksList.unshift(o.data)
        this.$message({
          message: o.msg,
          type: 'success'
        })
      }, loading)
    },
    editWork () {
      const editContent = this.editContent
      const loading = this.$loading({
        lock: true,
        text: 'Loading'
      })
      const index = this.worksList.findIndex((item) => {
        return item.id === editContent.id
      })
      this.submitWork(this.$apis.editWorks, editContent, (o) => {
        this.editLayer = false
        this.$set(this.worksList, index, o.data)
        this.$message({
          message: o.msg,
          type: 'success'
        })
      }, loading)
    },
    submitWork (api, data, cb, loading) {
      const {
        name,
        type,
        startDate,
        endDate,
        link,
        imgFile,
        imgSrc,
        id
      } = data
      if (!name || !type || !startDate || !endDate) {
        this.$message({
          message: '请将内容填写完整',
          type: 'warning'
        })
        loading.close()
        return
      }
      let formData = new FormData()
      formData.append('name', name)
      formData.append('type', type)
      formData.append('startDate', this.formatDate(startDate, 'yyyy-MM-dd'))
      formData.append('endDate', this.formatDate(endDate, 'yyyy-MM-dd'))
      formData.append('link', link)
      if (id) {
        formData.append('id', id)
      }
      if (imgFile && imgFile.name) {
        formData.append('imgFile', imgFile)
      } else {
        formData.append('imgSrc', imgSrc)
      }
      this.$http.post(api, formData, {headers: {'Content-type': 'multipart/form-data'}})
        .then(
          (data) => {
            const o = data.body
            loading.close()
            if (o.code === 200) {
              cb(o)
            } else {
              this.$message({
                message: o.msg,
                type: 'warning'
              })
            }
          },
          (data) => {
            loading.close()
            this.hanbleFail(data)
          }
        )
    },
    getWorksList () {
      const page = this.page
      this.$http.get(this.$apis.getWorks + '?page=' + page)
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
            this.hanbleFail(data)
          }
        )
    }
  },
  mounted () {
    this.getWorksList()
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

.table-img {
  display: block;
  width: 100%;
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    display: block;
    z-index: 2;
  }

  .el-icon-plus {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    line-height: $witdh;
    text-align: center;
    font-size: 20px;
  }

  .img {
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

  p {
    color: crimson;
    line-height: 1.3;
    font-size: 12px;
  }

  div {
    margin-top: 5px;
  }
}

.label {
  margin-right: 50px;

  span {
    margin-right: 10px;
  }
}

.works {
  .input {
    width: 217px;
  }

  .date {
    width: 150px;
  }
}
</style>
