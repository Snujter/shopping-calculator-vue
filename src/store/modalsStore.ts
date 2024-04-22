import { defineStore } from 'pinia'

export enum ModalNames {
  ITEMS_IMPORT = 'ITEMS_IMPORT',
  MANAGE_PAYERS = 'MANAGE_PAYERS',
}

interface State {
  [ModalNames.ITEMS_IMPORT]: boolean,
  [ModalNames.MANAGE_PAYERS]: boolean,
}

export const useModalsStore = defineStore('modals', {
  state: (): State => ({
    [ModalNames.ITEMS_IMPORT]: false,
    [ModalNames.MANAGE_PAYERS]: false
  }),
  actions: {
    setModal(modalName: ModalNames, value: boolean) {
      this[modalName] = value
    },
    toggleModal(modalName: ModalNames) {
      this[modalName] = !this[modalName]
    },
    openModal(modalName: ModalNames) {
      this[modalName] = true
    },
    closeModal(modalName: ModalNames) {
      this[modalName] = false
    }
  }
})
