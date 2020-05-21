<template>
  <div class="i-search">
    <el-form :model="model" :inline="true" ref="form">
       <slot>
         
       </slot>

      <el-form-item>
        <el-button @click="search" type="primary">查询</el-button>
        <el-button @click="reset" type="primary">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'i-search',
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    search () {
      this.$emit('search')
    },
    reset () {
      this.$refs.form.resetFields()
      this.$emit('reset')
    }
  }
}
</script>

<style scoped lang="scss">
.i-search {
  padding: 10px;

  .el-form {
    /deep/ .el-form-item {
      margin-bottom: 0;
      .el-form-item__content {
         padding: 0;
      }
      .el-form-item__label{
        width: 70px;
      }
      .el-input__inner{
        width: 202px;
      }
    }
  }
  
  /deep/ .el-col el-col-2{
    text-align: center;
  }
}
</style>
