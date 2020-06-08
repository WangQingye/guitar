<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { onMounted } from '@vue/composition-api'
export default {
  setup(props, context) {
    onMounted(() => {
      context.root.$store.dispatch('getCollection')
    })
  }
}
</script>
<style lang="scss">
body {
  background: #dfdfdf56;
  width: 100vw;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>
