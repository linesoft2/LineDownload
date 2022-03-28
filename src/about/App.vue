<template>
  <div id="app">关于页面</div>
</template>

<script>

window.oncontextmenu = (e) => {
  e.preventDefault();
};

export default {
  name: "App",
  components: {
  },
};
</script>

<style>
#app {
  user-select: none;
}
</style>
