import Vuex from 'vuex';

const state = {
  input_data: []
}

const getters = {
  getInputData: (state) => state.input_data
}

const mutations = {
  setInputData(state, data) {
    state.input_data = [];
    state.input_data = data;
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})



