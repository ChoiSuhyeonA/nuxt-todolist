export default{
   namespaced:true,

   state: () => ({
      todoItems: ['hello suhyeon2']
    }),
   mutations : {
      // todoItems의 배열 데이터값이 변경됐을 때, 사용하는 메서드이다. 
      changeTodoItems(state, payload){
         state.todoItems= payload
      }
  },
   actions : {
     callMutation ({ state, commit }, { newMsg }) {
        commit('changeTodoItems', newMsg)
      }
  },
   getters :{
     getMsg (state) {
        return `${state.todoItems} => Length : ${state.todoItems.length}`
      }
  }
  
  
}
