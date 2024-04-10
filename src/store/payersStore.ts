import type { Payer } from '@/interfaces'
import type { PersistConfig } from '@/store/plugins'
import { defineStore } from 'pinia'

export const usePayersStore = defineStore('payers', {
  state: () => ({
    payers: [] as Payer[]
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
  } as PersistConfig
})
