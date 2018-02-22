<template>
  <div>
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
    <el-dialog title="收货地址" :visible.sync="editLayer">
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
      writeList: [
        {
          content: 'Test',
          id: 8,
          img: 'http://q.qlogo.cn/headimg_dl?bs=qq&dst_uin=1047855633&spec=100',
          name: 'Test',
          time: '2018-2-18 21:13'
        },
        {
          content: 'Test',
          id: 7,
          img: 'http://q.qlogo.cn/headimg_dl?bs=qq&dst_uin=1047855633&spec=100',
          name: 'Test',
          time: '2018-2-18 21:13'
        },
        {
          content: 'Test',
          id: 6,
          img: 'http://q.qlogo.cn/headimg_dl?bs=qq&dst_uin=1047855633&spec=100',
          name: 'Test',
          time: '2018-2-18 21:13'
        }
      ],
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
      this.editLayer = false
      const submitWrite = () => {
        const writeList = this.writeList
        const id = this.editContent.id
        const index = writeList.findIndex((item) => {
          return item.id === id
        })
        const startArr = writeList.slice(0, index)
        const endArr = writeList.slice(index + 1)
        this.writeList = startArr.concat(this.editContent, endArr)
      }
      submitWrite()
    },
    handleDelete (index, id) {
      const deleteWrite = () => {
        const writeList = this.writeList
        const startArr = writeList.slice(0, index)
        const endArr = writeList.slice(index + 1)
        this.writeList = startArr.concat(endArr)
      }
      this.$http.delete(this.$apis.delWord + '?id=' + id)
        .then(
          (data) => {
            const o = data.body
            if (o.code === 200) {
              deleteWrite()
            }
          }
        )
    },
    getWordList () {
      this.$http.get(this.$apis.wordList + '?page=' + this.page)
        .then(
          (data) => {
            const o = data.body
            if (o) {
              this.writeList = this.writeList.concat(o.data)
              if (o.data.length) {
                this.blocker = true
              } else {
                this.message({
                  content: '已经加载完全部内容'
                })
              }
            }
          },
          (data) => {
            console.log(data)
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
