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
            <b-button class="mr-2" @click="pauseAll">全部暂停（临时改成添加任务）</b-button>
            <b-button>全部取消</b-button>
          </div>
          <div class="download_list">
            <download-bar v-for="n in downloadingTask" :title="n.title" :isPause="n.isPause" :progress="n.progress"
                          :status="n.status" :remainTime="n.remainTime" :speed="n.speed" :cLength="n.cLength"
                          :tLength="n.tLength" @pause="pause(n.gid)" @play="play(n.gid)" @del="del(n.gid)"/>
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
import {Command} from "@tauri-apps/api/shell";
import {dialog} from "@tauri-apps/api";
import {process} from "@tauri-apps/api";
import DownloadBar from "./components/DownloadBar.vue";
import Aria2Requester from "../aria2requester"
import {bytesToSize, timeRemaining, timeFormat, transStatus} from "@/utils"

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
}).catch(async (e) => {
  await dialog.message("aria2启动失败，原因：" + JSON.stringify(e));
  process.exit(0);
})


export default {
  name: "App",
  data() {
    return {
      downloadingTask: []
    }
  },
  components: {
    DownloadBar,
  },
  async mounted() {
    //屏蔽右键
    window.oncontextmenu = (e) => {
      e.preventDefault();
    };
    window.addEventListener("keydown", function (e) {
      if(e.keyCode === 116){
        //e.preventDefault()
      }
    });

    this.aria2requester = new Aria2Requester()
    setInterval(async (seconds) => {
      for (let i = 0; i < this.downloadingTask.length; i++) {
        let result = await this.aria2requester.request({
          method: "aria2.tellStatus",
          params: [this.downloadingTask[i].gid]
        })
        let isPause = result.status === "paused"
        let progress = Math.round((parseInt(result.completedLength) / parseInt(result.totalLength)) * 100)
        let status = transStatus(result.status)
        let remainTime = "剩余" + timeFormat(timeRemaining(result.totalLength, result.completedLength, result.downloadSpeed), {
          prefix: '',
          suffix: ''
        })
        let speed = bytesToSize(result.downloadSpeed) + "/s"
        let cLength = bytesToSize(result.completedLength)
        let tLength = bytesToSize(result.totalLength)
        console.log(progress)
        this.$set(this.downloadingTask, i, {
          ...this.downloadingTask[i],
          original: result,
          isPause,
          progress,
          status,
          remainTime,
          speed,
          cLength,
          tLength
        })
      }

    }, 1000)
  },
  methods: {
    async pauseAll() {
      //暂时的
      this.downloadingTask.push({
        gid: await this.aria2requester.request({
          method: "aria2.addUri",
          params: [["https://bigota.d.miui.com/V12.5.5.0.RJCCNXM/miui_LANCELOT_V12.5.5.0.RJCCNXM_54a2598d57_11.0.zip"]]
        }), title: "miui_LANCELOT_V12.5.5.0.RJCCNXM_..."
        //miui_LANCELOT_V12.5.5.0.RJCCNXM_54a2598d57_11.0.1
      })
    },
    pause(e) {
      this.aria2requester.request({
        method: "aria2.pause",
        params: [e]
      })
    },
    play(e) {
      this.aria2requester.request({
        method: "aria2.unpause",
        params: [e]
      })
    },
    del(e) {
      this.aria2requester.request({
        method: "aria2.remove",
        params: [e]
      })
    }
  }
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