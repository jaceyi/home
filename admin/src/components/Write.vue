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
            @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Write',
  data () {
    return {
      writeList: [],
      page: 1
    }
  },
  methods: {
    handleEdit: function (i, id) {
      console.log(i, id)
    },
    handleDelete: function (i, id) {
      console.log(i, id)
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
</style>
