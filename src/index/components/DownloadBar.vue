<template>
  <div class="download_bar">
    <div class="top">
      <div class="download_title">{{ title }}</div>
      <div>
        <b-tooltip :label="status==='已暂停'? '继续':'暂停'" position="is-bottom">
          <b-button @click="$emit(status==='已暂停'? 'play':'pause')" type="is-text" :icon-right="status==='已暂停'? 'play':'pause'" style="color: #7957d5;"></b-button>
        </b-tooltip>
        <b-tooltip label="删除" position="is-bottom">
          <b-button @click="$emit('del')" type="is-text" icon-right="delete" style="color: #f03a5f;;"></b-button>
        </b-tooltip>
        <b-tooltip label="更多" position="is-bottom">
          <b-button type="is-text" icon-right="dots-horizontal"></b-button>
        </b-tooltip>
      </div>
    </div>

    <b-progress
        class="progess"
        :value="progress"
        show-value
        format="percent"
    ></b-progress>
    <div class="buttom">
      <div>{{ cLength }}/{{ tLength }}</div>
      <div>{{ speed }}</div>
      <div>{{ remainTime }}</div>
      <div>{{ status }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "title",
    "progress",
    "status",
    "remainTime",
    "speed",
    "cLength",
    "tLength"
  ]
};
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
  margin-bottom: 0;
}
</style>