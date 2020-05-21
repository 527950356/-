<template>
  <div class="container" v-loading="loading">
    <div class="file-box">
      <el-button class="add-btn" @click="addImg" type="primary" icon="el-icon-plus" v-show="!imagePath"></el-button>
      <img v-show="imagePath" :src="imagePath" class="header">
      <el-button v-show="imagePath" @click="deleteImg" class="delete-btn" type="danger" icon="el-icon-delete"></el-button>
    </div>
    <input style="display:none" id="file" ref="file" type="file" value="" name="imageFile" @change="fileChange($event)"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'i-file',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imagePath: '',
      loading: false
    }
  },
  watch: {
    value: {
      handler (value) {
        this.imagePath = value

        if (!value) {
          document.getElementById('file').value = ''
        }
      },
      deep: true
    }
  },
  methods: {
    openImg () {
      window.open(this.imagePath)
    },
    addImg () {
      this.$refs.file.click()
    },
    deleteImg () {
      this.imagePath = ''
      this.$emit('input', this.imagePath)
    },
    fileChange (event) {
      if (event.target.files.length) {
        this.loading = true
        let form = new FormData()
        let imgFile = document.getElementById('file').files[0]
        form.append('imageFile', imgFile, imgFile.name) // 通过append向form对象添加数据
        // form.append('access_token', JSON.parse(sessionStorage.getItem('userInfo')).access_token) // 通过append向form对象添加数据

        console.log(form)

        axios({
          method: 'post',
          url: 'http://qtgi5u1uor.52http.net/pc/image/uploadImage',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(data => {
          console.log(form)
          this.loading = false
          this.imagePath = data.data.data.imagePath
          this.$emit('input', this.imagePath)
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.imagePath = ''
        this.$emit('input', this.imagePath)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .file-box {
    display: flex;
    justify-content: space-between;

    .add-btn {
      padding: 0 10px;
    }
    .header{
         width: 65px;
              height: 65px;
    }

    span:nth-child(2) {
      flex: 1;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      padding: 0 5px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        color: #409EFF;
      }
    }

    .delete-btn {
      padding: 0 10px;
    }
  }
}
</style>
