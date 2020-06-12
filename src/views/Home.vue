<template>
  <div class="home">
    <p class="title">
      <Icon name="music" class="icon" />
      <span class="title-text">{{state.testNum}}</span>
      <span class="title-text">清野吉他铺</span>
    </p>
    <Search class="search-input" v-model="state.searchValue" placeholder="请输入搜索关键词" />
    <p style="opacity: 0.9;color:rgb(255, 104, 107);text-indent: 24px; font-size:12px; text-align: left;margin-bottom:5px">网站吉他谱有横屏竖屏，建议开启手机的屏幕旋转；</p>
    <p style="opacity: 0.9;color:rgb(255, 104, 107);text-indent: 24px; font-size:12px; text-align: left">点击吉他谱右上方的收藏按钮可放入个人收藏夹方便下次查看。</p>
    <Divider content-position="left" :style="{ color: '#1989fa', borderColor: '#1989fa'}">我的收藏</Divider>
    <p style="font-size:12px" v-if="!state.collection.length">暂无收藏</p>
    <ul class="list-ul">
      <li class="list-li" v-for="(item,i) in state.collection" :key="i" @click="goImg(item)">
        <p class="list-p">{{item}}</p>
      </li>
    </ul>
    <Divider content-position="left" :style="{ color: '#1989fa', borderColor: '#1989fa'}">全部歌曲</Divider>
    <ul class="list-ul">
      <li class="list-li" v-for="(item,i) in state.curList" :key="i" @click="goImg(item)">
        <p class="list-p">{{item}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { Icon, Search, Divider } from 'vant'
import { reactive, onMounted, watch } from '@vue/composition-api'
import router from '@/router'
import useStore from '@/store/myStore'
import guitars from '@/guitar.json'
export default {
  name: 'Home',
  components: {
    Icon,
    Search,
    Divider
  },
  setup() {
    const [collectionRef, commit] = useStore('collection')
    const state = reactive({
      list: [],
      curList: [], // 用于展示搜索
      searchValue: '',
      collection: []
    })
    watch(
      () => state.searchValue,
      (search) => {
        state.curList = state.list.filter(key => {
          return key.indexOf(search) !== -1
        })
      }
    )
    function goImg(item) {
      router.push({ path: `/about/${item}`})
    }
    onMounted(()=> {
      for (const key in guitars) {
        state.list.push(key)
      }
      state.curList = state.list
      // if (!collectionRef.value) {
      //   const collection = JSON.parse(localStorage.getItem('GUITAR_COLLCTION'))
      //   commit('collection', collection || [])
      // }
      state.collection = collectionRef
    })
    return { state, goImg }
  },
}
</script>
<style lang="scss" scoped>
.title {
  line-height: 40px !important;
  height: 40px;
  font-size: 30px;
  margin-top: 20px;
  .icon {
    vertical-align: middle;
    margin-right: 8px;
  }
  .title-text {
    font-size: 32px;
    vertical-align: middle;
  }
}
.list-ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 10px;
  .list-li {
    margin-bottom: 20px;
    font-size: 12px;
    background: white;
    border-radius: 10px;
    height: 20px;
    padding: 5px;
    box-shadow: 3px 3px 3px rgb(219, 219, 219);
    .list-p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
.search-input {
  background-color: transparent;
  margin-top: 20px;
}
</style>
