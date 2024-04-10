import { defineStore } from 'pinia'
import { SHOP_TYPES } from '@/globals'

export const useCommonStore = defineStore('common', {
  state: () => ({
    deliveryDate: '',
    shopType: SHOP_TYPES.Morrisons
  }),
  actions: {
    setDeliveryDate(newDate: string) {
      this.deliveryDate = newDate
    },
    setShopType(newType: SHOP_TYPES) {
      this.shopType = newType
    }
  },
  getters: {
    getCsvDownloadFileName: function () {
      let shopName = ''
      if (this.shopType === SHOP_TYPES.Morrisons) {
        shopName = 'morrisons'
      }
      return `${shopName}-${this.deliveryDate}`
    }
  }
})
