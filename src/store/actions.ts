import type { Payer } from '@/interfaces'
import { MutationTypes } from '@/store/mutations'
import { Commit } from 'vuex'
import type { State } from '@/store/state'

export const enum ActionTypes {
  ADD_PAYER = 'ADD_PAYER',
  DELETE_PAYER = 'DELETE_PAYER',
}

const actions = {
  [ActionTypes.ADD_PAYER]({ commit, state }: { commit: Commit, state: State }, payload: { name: Payer['name'] }) {
    const newPayer = { id: state.payers.length + 1, name: payload.name }
    commit(MutationTypes.ADD_PAYER, newPayer)
    commit(MutationTypes.ADD_PAYER_TO_ITEMS, newPayer)
  },
  [ActionTypes.DELETE_PAYER]({ commit }: { commit: Commit }, payerId: Payer['id']) {
    commit(MutationTypes.DELETE_PAYER, payerId)
    commit(MutationTypes.DELETE_PAYER_FROM_ITEMS, payerId)
  }
}

export default actions
