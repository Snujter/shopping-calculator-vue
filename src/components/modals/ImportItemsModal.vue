<template>
  <AppModal v-model='isModalOpen'>
    <template #header>Import Items</template>
    <AppMessage v-if='message.text' :variant='message.type' class='mb-4'>
      {{ message.text }}
    </AppMessage>
    <FormInputGroup>
      <template #label>From</template>
      <template #input>
        <DropdownSelect
          :items='[{value: ShopTypes.MORRISONS, label: "Morrison&#39;s"}]'
          v-model='shopType'
        />
      </template>
    </FormInputGroup>
    <FormInputGroup>
      <template #label>Date</template>
      <template #input>
        <AppInput v-model='deliveryDate' type='date' />
      </template>
    </FormInputGroup>
    <FormInputGroup>
      <template #label>Items</template>
      <template #input>
        <TextAreaInput v-model='itemsText' class='h-36' />
      </template>
    </FormInputGroup>
    <template #footer>
      <AppButton @click='setItems'>FORMAT BABY</AppButton>
    </template>
  </AppModal>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import type { Item, Payer, Payment } from '@/interfaces'
import { PaymentTypes, ShopTypes } from '@/globals'
import { useCommonStore } from '@/store/commonStore'
import { ModalNames, useModalsStore } from '@/store/modalsStore'
import { usePayersStore } from '@/store/payersStore'
import { useItemsStore } from '@/store/itemsStore'
import useMessage from '@/composables/useMessage'
import AppButton from '@/components/inputs/AppButton.vue'
import FormInputGroup from '@/components/inputs/FormInputGroup.vue'
import TextAreaInput from '@/components/inputs/TextAreaInput.vue'
import AppModal from '@/components/modals/AppModal.vue'
import DropdownSelect from '@/components/inputs/DropdownSelect.vue'
import AppMessage from '@/components/AppMessage.vue'
import AppInput from '@/components/inputs/AppInput.vue'

// global vars
const commonStore = useCommonStore()
const shopType = computed({
  get: () => commonStore.shopType,
  set: (value) => commonStore.setShopType(value)
})
const deliveryDate = computed({
  get: () => commonStore.deliveryDate,
  set: (value) => commonStore.setDeliveryDate(value)
})

// handle modal opening / closing
const modalStore = useModalsStore()
const isModalOpen = computed({
  get: () => modalStore.ITEMS_IMPORT,
  set: (value) => {
    if (value === false) {
      resetMessage()
    }
    return modalStore.setModal(ModalNames.ITEMS_IMPORT, value)
  }
})

// vars to handle parsing plain text to a list of items
const payersStore = usePayersStore()
const itemsStore = useItemsStore()
const { message, setMessage, resetMessage } = useMessage()

const itemsText = ref('')

// parse items from morrisons
const parseMorrisonsItems = (): Item[] => {
  const prepareText = (text: string) => {
    return text
      .split('\n') // create array of strings
      .map((row: string) => row.trim()) // remove whitespace
      .filter((row: string) => row.length !== 0 && Number.isInteger(parseInt(row.charAt(0)))) // remove empty rows and rows not starting with a number
  }

  // split the string by new lines and trim extra whitespace
  const textArray = prepareText(itemsText.value)

  return textArray.map((row, i) => {
    // separate by spaces
    const rowArray = row.split(' ')

    // row begins with quantity, remove from rowArray
    const quantity = parseInt(rowArray.shift() || '')

    // and ends with full price of the item, remove from rowArray and get the numbers only
    const lastItem = rowArray.pop()
    const digits = lastItem?.match(/\d/g)
    const fullPrice = parseInt(digits?.join('') ?? '0')

    // getting numbers only will cause 3.99 to be displayed as 399 so divide by 100
    const price = Math.floor(fullPrice) / 100

    // the remaining data is the name of the item
    const name = rowArray.join(' ')

    // create default payment group
    const paymentGroup = {
      type: PaymentTypes.EQUAL,
      payments: payersStore.payers.map((payer: Payer): Payment => {
        return {
          payerId: payer.id,
          isEqualPayer: false,
          quantity: 0,
          percentage: 0
        }
      })
    }

    return {
      id: i + 1,
      quantity,
      price,
      name,
      paymentGroup
    }
  })
}
const setItems = () => {
  resetMessage()

  if (!itemsText.value.length) {
    setMessage('error', 'Items field can\'t be empty.')
    return
  }

  let newItems: Item[] = []
  if (shopType.value === ShopTypes.MORRISONS) {
    newItems = parseMorrisonsItems()
  }

  if (newItems.length === 0) {
    setMessage('error', 'No items could be parsed.')
    return
  }

  // overwrite existing items with new ones
  itemsStore.setItems(newItems)

  setMessage('success', `Imported ${newItems.length} items.`)
}
</script>
