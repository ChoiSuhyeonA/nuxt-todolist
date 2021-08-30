 const state = () => ({
    //배열
   
    todoItems: ['']

        
      
})
 const mutations= {
    // todoItems의 배열 데이터값이 변경됐을 때, 사용하는 메서드이다. 
    changeTodoItems(state, newState){
        state.todoItems = newState
    }
}
 const actions= {
    //ex
}
 const getters={
    // ex 
    // getItems(state){
    //     return `${state.todoItems} => Length : ${state.todoItems.length}`
    // }
}

export default {state, mutations, actions, getters}