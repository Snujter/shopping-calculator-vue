import { defineStore } from 'pinia'

export enum ModalNames {
  ITEMS_IMPORT_MODAL = 'ITEMS_IMPORT_MODAL',
  MANAGE_PAYERS_MODAL = 'MANAGE_PAYERS_MODAL',
}

interface State {
  [ModalNames]: boolean,
}

export const useModalsStore = defineStore('modals', {
  state: (): State => ({
    [ModalNames.ITEMS_IMPORT_MODAL]: false,
    [ModalNames.MANAGE_PAYERS_MODAL]: false
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
