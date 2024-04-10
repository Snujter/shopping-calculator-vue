import { defineStore } from 'pinia'

export enum ModalNames {
  ItemsImportModal = 'itemsImportModal',
  ManagePayersModal = 'managePayersModal',
}

export const useModalsStore = defineStore('modals', {
  state: () => ({
    [ModalNames.ItemsImportModal]: false,
    [ModalNames.ManagePayersModal]: false
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
