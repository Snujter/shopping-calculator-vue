import type { Payer } from '@/interfaces'
import { MutationTypes } from '@/store/mutations'

export const enum ActionTypes {
  ADD_PAYER = 'ADD_PAYER',
  DELETE_PAYER = 'DELETE_PAYER',
}

const actions = {
  [ActionTypes.ADD_PAYER]({ commit, state }, payload: { name: Payer['name'] }) {
    const newPayer = { id: state.payers.length + 1, name: payload.name }
    commit(MutationTypes.ADD_PAYER, newPayer)
    commit(MutationTypes.ADD_PAYER_TO_ITEMS, newPayer)
  },
  [ActionTypes.DELETE_PAYER]({ commit }, payerId: Payer['id']) {
    commit(MutationTypes.DELETE_PAYER, payerId)
    commit(MutationTypes.DELETE_PAYER_FROM_ITEMS, payerId)
  }
}

export default actions
