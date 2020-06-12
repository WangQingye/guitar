<template>
  <div class="about">
    <Icon class="star" :name=" state.isCollected ? 'star' : 'star-o'" @click="clickCollect"/>
    <Swipe :class="['my-swipe']" autoplay="0" indicator-color="white">
      <Swipe-Item class="my-swipe-item" v-for="(img, i) in state.urls" :key="i">
        <img class="swipe-img" :src="img">
      </Swipe-Item>
    </Swipe>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted } from '@vue/composition-api'
import { Swipe, SwipeItem, Icon } from 'vant'
import useStore from '@/store/myStore'
import guitars from '@/guitar.json'
export default {
  components: {
    Swipe,
    SwipeItem,
    Icon
  },
  setup(props, context) {
    const [collectionRef,commit] = useStore('collection')
    const state = reactive({
      title: '',
      urls: [],
      isCollected: false
    })
    onMounted(() => {
      state.title = context.root.$route.params.keyName
      state.urls = guitars[state.title]
      state.isCollected = collectionRef.value.indexOf(state.title) !== -1
    })
    // const clickCollect = () => {
    //   let aciton = 'addCollection'
    //   if (state.isCollected) {
    //     aciton = 'deleteCollection'
    //   }
    //   context.root.$store.commit(aciton, state.title)
    //   state.isCollected = !state.isCollected
    // }
    const clickCollect = () => {
      if (state.isCollected) {
        collectionRef.value.splice(collectionRef.value.indexOf(state.title), 1)
      } else {
        collectionRef.value.push(state.title)
      }
      console.log(collectionRef.value)
      commit('collection', collectionRef.value)
      state.isCollected = !state.isCollected
    }
    return { state, clickCollect }
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
  background: #fff;
  .my-swipe-item {
    .swipe-img {
      max-width: 100%;
    }
  }
}
.star {
  color:rgb(255, 104, 107);
  z-index:999;
  position:fixed;
  font-size: 20px;
  right: 30px;
  top: 30px;
}
</style>
