<template>
  <div id="app">欢迎使用LineDownload</div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { Command } from "@tauri-apps/api/shell";
const aria2c = Command.sidecar("aria2c", []);
aria2c.execute().then((e) => {
    // aria2 关闭
    
});
window.oncontextmenu = (e) => {
  e.preventDefault();
};

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  user-select: none;
}
</style>
