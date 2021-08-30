import Vue from 'vue'
import Vuex from 'vuex'
import todoItems from './todoitems'
Vue.use(Vuex)


export const store = new Vuex.Store({
  modules:{
  items: todoItems
  }
})

