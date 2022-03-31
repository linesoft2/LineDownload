<template>
  <div id="app">
    <b-tabs type="is-boxed">
      <b-tab-item label="下载中" icon="download">
        <template #header>
          <b-icon icon="download"></b-icon>
          <span> 下载中 <b-tag rounded> 3 </b-tag> </span>
        </template>
        <div class="downloading">
          <div class="toolbar">
            <b-button @click="clickMe" class="mr-2">全部暂停</b-button>
            <b-button @click="clickMe">全部取消</b-button>
          </div>
          <div class="download_list">
            <download-bar v-for="n in 10" />
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="已完成">
        <template #header>
          <b-icon icon="check-bold"></b-icon>
          <span> 已完成 <b-tag rounded> 3 </b-tag> </span>
        </template>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { Command } from "@tauri-apps/api/shell";
import { dialog } from "@tauri-apps/api";
import { process } from "@tauri-apps/api";
import DownloadBar from "./components/DownloadBar.vue";
const aria2c = Command.sidecar("aria2c/aria2c", [
  "--enable-rpc=true",
  "--check-certificate=false",
  "--disable-ipv6=true",
  "--rpc-allow-origin-all=true",
  "--rpc-listen-port=9695",
  "--quiet",
  "--file-allocation=none",
  "--rpc-secret=linedownloadtest",
]);
aria2c.execute().then(async (e) => {
  // aria2 关闭
  console.log(e);
  if (e.code !== 0) {
    await dialog.message("aria2异常关闭，代码：" + e.code);
    process.exit(0);
  }
}).catch(async (e)=>{
  await dialog.message("aria2启动失败，原因：" + JSON.stringify(e));
    process.exit(0);
})
window.oncontextmenu = (e) => {
  e.preventDefault();
};

export default {
  name: "App",
  components: {
    DownloadBar,
  },
};
</script>

<style>
html {
  overflow-y: hidden !important;
}

#app {
  user-select: none;
}

.toolbar {
  display: flex;
  justify-content: flex-end;
  border-bottom: 2px solid #f5f5f5;
  padding-bottom: 1rem;
}
.downloading {
  display: flex;
  flex-direction: column;
  height: inherit;
}
.download_list {
  height: calc(100vh - 120px);
  overflow-y: scroll;
  width: calc(100vw - 18px);
  padding-right: 1rem;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #807f7f;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>