<template>
  <main class='p-10 w-screen h-screen'>
    <div class='w-full h-full overflow-auto'>
      <table class='mx-auto break-words'>
        <thead>
        <tr>
          <TableHeader class='text-right min-w-[4rem] w-[4rem]'>#</TableHeader>
          <TableHeader class='text-left min-w-[20rem] w-[28rem]'>Name</TableHeader>
          <TableHeader class='text-right min-w-[5rem] w-[6rem]'>Qty</TableHeader>
          <TableHeader class='text-right min-w-[12rem] w-[12rem]'>Price</TableHeader>
          <TableHeader class='min-w-[16rem] w-[16rem]'>Split</TableHeader>
          <TableHeader
            v-for='payer in payers'
            :key='payer.id'
            class='text-center min-w-[12rem] w-[20rem]'
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
          @update:payer-is-equal='(payload) => setIsEqualPayer(payload)'
          @update:payer-quantity='(payload) => setPayerQuantity(payload)'
          @update:payer-percentage='(payload) => setPayerPercentage(payload)'
        />
        </tbody>
      </table>
    </div>
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

function setIsEqualPayer(payload: { itemId: Item['id'], payerId: Payment['payerId'], newValue: boolean }) {
  const item = items.value.find(item => item.id === payload.itemId)
  if (!item) {
    return
  }

  const payment = item.paymentGroup.payments.find(payment => payment.payerId === payload.payerId)
  if (!payment) {
    return
  }
  payment.isEqualPayer = payload.newValue
}

function setPayerQuantity(payload: { itemId: Item['id'], payerId: Payment['payerId'], newValue: number }) {
  const item = items.value.find(item => item.id === payload.itemId)
  if (!item) {
    return
  }

  const payment = item.paymentGroup.payments.find(payment => payment.payerId === payload.payerId)
  if (!payment) {
    return
  }
  payment.quantity = payload.newValue
}

function setPayerPercentage(payload: { itemId: Item['id'], payerId: Payment['payerId'], newValue: number }) {
  const item = items.value.find(item => item.id === payload.itemId)
  if (!item) {
    return
  }

  const payment = item.paymentGroup.payments.find(payment => payment.payerId === payload.payerId)
  if (!payment) {
    return
  }
  payment.percentage = payload.newValue
}
</script>
