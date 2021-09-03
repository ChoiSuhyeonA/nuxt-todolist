export default {
  // namespaced: true,

  state: () => ({
    items: [""]
    //prettier-ignore
  }),
  mutations: {
    // todoItems의 배열 데이터값이 변경됐을 때, 사용하는 메서드이다.
    changeTodoItems(state, payload) {
      state.items = payload;
    }
  },
  actions: {
    callMutation({ state, commit }, { newMsg }) {
      commit("changeTodoItems", newMsg);
    }
  },
  getters: {
    getMsg(state) {
      return `${state.items} => Length : ${state.items.length}`;
    }
  }
};
