import { createStore } from 'vuex'
import state from './state'
import mutations, { MutationTypes } from './mutations'
import getters from './getters'
import actions from './actions'

const payerMutations = [
  MutationTypes.ADD_PAYER,
  MutationTypes.DELETE_PAYER,
  MutationTypes.UPDATE_PAYER
]
const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    if (payerMutations.includes(mutation.type)) {
      localStorage.setItem('payers', JSON.stringify(state.payers))
    }
  })
}

const store = createStore({
  state,
  mutations,
  getters,
  actions,
  plugins: [localStoragePlugin]
})

export default store
