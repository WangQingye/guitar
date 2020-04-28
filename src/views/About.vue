<template>
  <div class="about">
    <Swipe :class="['my-swipe']" autoplay="0" indicator-color="white">
      <Swipe-Item class="my-swipe-item" v-for="(img, i) in state.urls" :key="i">
        <img class="swipe-img" :src="img">
      </Swipe-Item>
    </Swipe>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted } from '@vue/composition-api'
import { Swipe, SwipeItem } from 'vant'
import guitars from '@/guitar.json'
export default {
  components: {
    Swipe,
    SwipeItem,
  },
  setup(props, context) {
    const state = reactive({
      title: '',
      urls: [],
    })
    onMounted(() => {
      state.title = context.root.$route.params.keyName
      state.urls = guitars[state.title].urls
    })
    return { state }
  },
}
</script>
<style lang="scss" scoped>
.about {
  width: 100vw;
  height: 95vh;
}
.my-swipe {
  min-height: 100px;
  background: rgb(102, 198, 242);
  .my-swipe-item {
    .swipe-img {
      max-width: 100%;
    }
  }
}
</style>
