import type { Payer } from '@/interfaces'
import { defineStore } from 'pinia'

interface State {
  payers: Payer[],
}

export const usePayersStore = defineStore('payers', {
  state: (): State => ({
    payers: []
  }),
  actions: {
    addPayer(payer: Payer) {
      this.payers = [...this.payers, payer]
    },
    updatePayer(id: Payer['id'], payload: Partial<Payer>) {
      this.payers = this.payers.map((payer: Payer) => (
        payer.id === id ? { ...payer, ...payload } : payer
      ))
    },
    deletePayer(payerId: Payer['id']) {
      this.payers = this.payers.filter(p => p.id !== payerId)
    }
  },
  persistConfig: {
    addPayer: ['payers'],
    updatePayer: ['payers'],
    deletePayer: ['payers']
  }
})
