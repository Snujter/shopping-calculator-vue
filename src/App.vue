<template>
  <main class='m-10'>
    <table>
      <thead>
      <tr>
        <TableHeader class='text-right'>#</TableHeader>
        <TableHeader class='text-left'>Name</TableHeader>
        <TableHeader class='text-right'>Qty</TableHeader>
        <TableHeader class='text-right'>Price</TableHeader>
        <TableHeader>Split</TableHeader>
        <TableHeader
          v-for='payer in payers'
          :key='payer.id'
          class='text-center'
        >
          {{ payer.name }}
        </TableHeader>
      </tr>
      </thead>

      <tbody>
      <TableRow
        v-for='item in items'
        :key='item.id'
        :id='item.id'
        :name='item.name'
        :quantity='item.quantity'
        :price='item.price'
        :payment-group='item.paymentGroup'
        @update:selected-payment-type='(payload) => setPaymentTypeForItem(payload)'
      />
      </tbody>
    </table>
  </main>
</template>

<script setup lang='ts'>
import type { Payer, Item, Payment } from '@/interfaces'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { PAYMENT_TYPES } from '@/globals'
import { TEST_ITEMS, TEST_PAYERS } from '@/testData'
import TableHeader from '@/components/TableHeader.vue'
import TableRow from '@/components/TableRow.vue'

/* data */
// @TODO - flatten data structure and rename interfaces
const payers: Ref<Payer[]> = ref(TEST_PAYERS)
const items: Ref<Item[]> = ref(TEST_ITEMS)

/* methods */
function setPaymentTypeForItem(payload: { itemId: Item['id'], newType: PAYMENT_TYPES }) {
  const item = items.value.find(item => item.id === payload.itemId)
  if (!item) {
    return
  }
  item.paymentGroup.type = payload.newType
}
</script>
