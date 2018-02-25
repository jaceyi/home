<template>
  <div>
    <div class="head">
      <span>留言管理</span>
    </div>
    <el-table
      :data="writeList"
      style="width: 100%">
      <el-table-column
        label="头像"
        width="80">
        <template slot-scope="scope">
          <img class="img" :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
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
    <el-dialog title="留言编辑" :visible.sync="editLayer">
      <el-form :model="editContent">
        <el-form-item label="昵称">
          <el-input
          v-model="editContent.name"
          class="edit-name"></el-input>
          <img
          :src="editContent.img"
          class="edit-img"
          alt="头像">
        </el-form-item>
        <el-form-item label="内容">
          <el-input
          type="textarea"
          v-model="editContent.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editLayer = false">取 消</el-button>
        <el-button type="primary" @click="handelSubmitEdit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Write',
  data () {
    return {
      editLayer: false,
      editContent: {},
      writeList: [],
      page: 1
    }
  },
  methods: {
    handleEdit (index, id) {
      this.editLayer = true
      this.editContent = {
        ...this.writeList[index]
      }
    },
    handelSubmitEdit () {
      const { editContent } = this
      const submitWrite = () => {
        const writeList = this.writeList
        const id = editContent.id
        const index = writeList.findIndex((item) => {
          return item.id === id
        })
        const startArr = writeList.slice(0, index)
        const endArr = writeList.slice(index + 1)
        this.writeList = startArr.concat(editContent, endArr)
      }
      this.$http.post(this.$apis.editWord, editContent)
        .then(
          (data) => {
            const o = data.body
            if (o.code === 200) {
              this.editLayer = false
              submitWrite()
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
    },
    handleDelete (index, id) {
      this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(this.$apis.delWord + '?id=' + id)
          .then(
            (data) => {
              const o = data.body
              if (o.code === 200) {
                const writeList = this.writeList
                this.writeList = this.deleteItem(writeList, index)
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
      })
    },
    getWordList () {
      this.$http.get(this.$apis.getWord + '?page=' + this.page)
        .then(
          (data) => {
            const o = data.body
            if (o.code === 200) {
              this.writeList = this.writeList.concat(o.data)
              if (o.data.length) {
                this.blocker = true
              } else {
                this.message({
                  content: '已经加载完全部内容'
                })
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
    this.getWordList()
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

.img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  display: block;
  border: 1px solid #ccc;
}

.edit-name {
  width: 200px;
}

.edit-img {
  height: 70px;
  border-radius: 50%;
  float: right;
  margin-top: -30px;
  margin-right: 20px;
}
</style>
