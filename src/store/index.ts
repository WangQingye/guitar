import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collection: []
  },
  mutations: {
    saveCollection( state, collection) {
      state.collection =collection
      localStorage.setItem('GUITAR_COLLCTION', JSON.stringify(state.collection))
    },
    addCollection( state, item) {
      console.log(state.collection)
      localStorage.setItem('GUITAR_COLLCTION', JSON.stringify(state.collection))
    },
    deleteCollection( state, item) {
      state.collection.splice(state.collection.indexOf(item), 1)
      localStorage.setItem('GUITAR_COLLCTION', JSON.stringify(state.collection))
    }
  },
  actions: {
    getCollection( context ) {
      const collection = JSON.parse(localStorage.getItem('GUITAR_COLLCTION'))
      context.commit('saveCollection', collection || [])
    }
  },
  modules: {}
});
