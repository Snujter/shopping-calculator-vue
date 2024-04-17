import { defineStore } from 'pinia'
import { ShopTypes } from '@/globals'

export const useCommonStore = defineStore('common', {
  state: () => ({
    deliveryDate: '',
    shopType: ShopTypes.MORRISONS
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
      if (this.shopType === ShopTypes.MORRISONS) {
        shopName = 'morrisons'
      }
      return `${shopName}-${this.deliveryDate}`
    }
  }
})
