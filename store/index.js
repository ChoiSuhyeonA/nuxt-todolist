import Vue from 'vue'
import Vuex from 'vuex'
import  todoitems from './todoitems'
Vue.use(Vuex)


export const store = new Vuex.Store({
  modules:{
  item: todoitems
  },
  state : () => ({ 
    todoItems :['hello suhyeon']
}),
  
})
