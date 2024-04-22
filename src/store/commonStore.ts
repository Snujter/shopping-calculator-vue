import { defineStore } from 'pinia'
import { ShopTypes } from '@/globals'

interface State {
  deliveryDate: string,
  shopType: ShopTypes
}

export const useCommonStore = defineStore('common', {
  state: (): State => ({
    deliveryDate: '',
    shopType: ShopTypes.MORRISONS
  }),
  actions: {
    setDeliveryDate(newDate: string) {
      this.deliveryDate = newDate
    },
    setShopType(newType: ShopTypes) {
      this.shopType = newType
    }
  },
  getters: {
    getCsvDownloadFileName: function (): string {
      let shopName = ''
      if (this.shopType === ShopTypes.MORRISONS) {
        shopName = 'morrisons'
      }
      return `${shopName}-${this.deliveryDate}`
    }
  }
})
