<template>
  <div class="box">
    <div class="self">
      <img src="../../images/self/avatar.jpg" alt />
      <p class="name">昵称：ikissrainow</p>
      
    </div>

    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell">
        <a href="#" class="mui-navigate-right">账户与安全</a>
      </li>
    </ul>
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell">
        <a href="#" class="mui-navigate-right">地区设置</a>
      </li>
      <li class="mui-table-view-cell">
        <a href="#" class="mui-navigate-right">音效与通知</a>
      </li>
      <li class="mui-table-view-cell">
        <a href="#" class="mui-navigate-right">隐私</a>
      <li class="mui-table-view-cell">
        <a href="#" class="mui-navigate-right">通用</a>
      </li>
    </ul>
    <div class="mui-table-view">
      <mt-button type="primary" size="large" @click="postComment">切换账号</mt-button>
    </div>
    <div class="mui-table-view">
      <mt-button type="danger" size="large" @click="postComment">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
  padding: 0;
}
.self {
  background-color: #fff;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.name {
  font-size: 25px;
  color: #000;
  margin-top: 30px;
  margin-left: 30px;
  vertical-align: middle;
}
.code {
  position: absolute;
  right: 0;
  padding: 15px;
}
.code img {
  width: 60px;
  height: 60px;
  border-radius: 0;
}
.mui-table-view {
  margin-bottom: 25px;
}
</style>