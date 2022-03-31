<template>
  <div class="download_bar">
    <div class="top">
      <div class="download_title">测试测试测试</div>
      <div>
        <b-tooltip label="暂停" position="is-bottom">
          <b-button type="is-text" icon-right="pause" style="color: #7957d5;"></b-button>
        </b-tooltip>
        <b-tooltip label="删除" position="is-bottom">
          <b-button type="is-text" icon-right="delete" style="color: #f03a5f;;"></b-button>
        </b-tooltip>
        <b-tooltip label="更多" position="is-bottom">
          <b-button type="is-text" icon-right="dots-horizontal"></b-button>
        </b-tooltip>
      </div>
    </div>

    <b-progress
      class="progess"
      :value="40"
      show-value
      format="percent"
    ></b-progress>
    <div class="buttom">
      <div>100MB/5.8GB</div>
      <div>233MB/s</div>
      <div>剩余1小时</div>
      <div>下载中</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.download_bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.download_bar .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.download_bar .buttom {
  display: flex;
  justify-content: space-between;
}
.download_bar .progess {
  margin-bottom: 0rem;
}
</style>