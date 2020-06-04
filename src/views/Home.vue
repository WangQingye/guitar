<template>
  <div class="home">
    <p class="title">
      <Icon name="music" class="icon" />
      <span class="title-text">{{state.testNum}}</span>
      <span class="title-text">清野吉他铺</span>
    </p>
    <Search class="search-input" v-model="state.searchValue" placeholder="请输入搜索关键词" />
    <ul class="list-ul">
      <li class="list-li" v-for="(item,i) in state.curList" :key="i" @click="goImg(item)">
        <p class="list-p">{{item}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { Icon, Search } from 'vant'
import { reactive, onMounted, watch } from '@vue/composition-api'
import router from '@/router'
import guitars from '@/guitar.json'
export default {
  name: 'Home',
  components: {
    Icon,
    Search
  },
  setup() {
    const state = reactive({
      list: [],
      curList: [], // 用于展示搜索
      searchValue: ''
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
  width: 100%;
  .list-li {
    margin-top: 20px;
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
