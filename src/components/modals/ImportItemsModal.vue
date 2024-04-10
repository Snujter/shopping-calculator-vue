<template>
  <AppModal v-model='isModalOpen'>
    <template #header>Import Items</template>
    <ErrorMessage class='mb-4' v-if='errorMsg'>
      {{ errorMsg }}
    </ErrorMessage>
    <SuccessMessage class='mb-4' v-if='successMsg'>
      {{ successMsg }}
    </SuccessMessage>
    <FormInputGroup>
      <template #label>From</template>
      <template #input>
        <DropdownSelect
          :items='[{value: SHOP_TYPES.Morrisons, label: "Morrison&#39;s"}]'
          v-model='shopType'
        />
      </template>
    </FormInputGroup>
    <FormInputGroup>
      <template #label>Date</template>
      <template #input>
        <AppInput type='date' v-model='deliveryDate' />
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
import AppButton from '@/components/inputs/AppButton.vue'
import { computed, ref } from 'vue'
import { PAYMENT_TYPES, SHOP_TYPES } from '@/globals'
import type { Payer, Payment } from '@/interfaces'
import FormInputGroup from '@/components/inputs/FormInputGroup.vue'
import TextAreaInput from '@/components/inputs/TextAreaInput.vue'
import AppModal from '@/components/modals/AppModal.vue'
import DropdownSelect from '@/components/inputs/DropdownSelect.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import AppInput from '@/components/inputs/AppInput.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'
import { useCommonStore } from '@/store/commonStore'
import { ModalNames, useModalsStore } from '@/store/modalsStore'
import { usePayersStore } from '@/store/payersStore'
import { useItemsStore } from '@/store/itemsStore'

const commonStore = useCommonStore()
const modalStore = useModalsStore()
const payersStore = usePayersStore()
const itemsStore = useItemsStore()

const successMsg = ref('')
const errorMsg = ref('')
const itemsText = ref('')

/* computed */
const deliveryDate = computed({
  get: () => commonStore.deliveryDate,
  set: (value) => commonStore.setDeliveryDate(value)
})
const isModalOpen = computed({
  get: () => modalStore.itemsImportModal,
  set: (value) => {
    if (value === false) {
      clearMessages()
    }
    return modalStore.setModal(ModalNames.ItemsImportModal, value)
  }
})
const shopType = computed({
  get: () => commonStore.shopType,
  set: (value) => commonStore.setShopType(value)
})

const setItems = () => {
  clearMessages()

  if (!itemsText.value.length) {
    errorMsg.value = 'No items found.'
    return
  }

  // split the string by new lines and trim extra whitespace
  const textArray = prepareText(itemsText.value)

  const newItems = textArray.map((row, i) => {
    // separate by spaces
    const rowArray = row.split(' ')

    // row begins with quantity, remove from rowArray
    const quantity = parseInt(rowArray.shift())

    // and ends with full price of the item, remove from rowArray and get the numbers only
    const fullPrice = parseInt(rowArray.pop().match(/\d/g).join(''))

    // getting numbers only will cause 3.99 to be displayed as 399 so divide by 100
    const price = Math.floor(fullPrice) / 100

    // the remaining data is the name of the item
    const name = rowArray.join(' ')

    // create default payment group
    const paymentGroup = {
      type: PAYMENT_TYPES.Equal,
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

  // overwrite existing items with new ones
  itemsStore.setItems(newItems)

  successMsg.value = `Imported ${newItems.length} items.`
}

const prepareText = (text: string) => {
  return text
    .split('\n') // create array of strings
    .map((row: string) => row.trim()) // remove whitespace
    .filter((row: string) => row.length !== 0 && Number.isInteger(parseInt(row.charAt(0)))) // remove empty rows and rows not starting with a number
}

const clearMessages = () => {
  errorMsg.value = ''
  successMsg.value = ''
}
</script>
