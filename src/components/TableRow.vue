<template>
  <tr class='text-text tracking-wider border-b-2 border-primary border-opacity-30'>
    <td class='text-right p-4 text-gray-500'>{{ id }}</td>
    <td class='text-left p-4'>{{ name }}</td>
    <td class='text-right p-4 text-xl tracking-normal'>{{ quantity }}</td>
    <td class='text-right p-4 tracking-normal'>
      <ItemPrice :price='price' />
      <ItemPricePerUnit :price='pricePerUnit' />
    </td>
    <td class='text-center px-4 py-2'>
      <DropdownSelect
        :items='paymentTypesMap'
        v-model='paymentGroupType'
      />
    </td>
    <td
      v-for='payment in paymentGroup.payments' :key='payment.payerId'
      class='text-center'
    >
      <EqualPay
        v-if='paymentGroup.type === PAYMENT_TYPES.Equal'
        :price='itemPayments[payment.payerId]'
        :is-equal-payer='payment.isEqualPayer'
        @click.prevent='() => setPayerIsEqualPayer(payment.payerId, !payment.isEqualPayer)'
      />
      <QuantityPay
        v-else-if='paymentGroup.type === PAYMENT_TYPES.Quantity'
        :price='itemPayments[payment.payerId]'
        :quantity='payment.quantity'
        :max-quantity='quantity'
        @update:quantity='(newValue) => setPayerQuantity(payment.payerId, newValue)'
      />
      <PercentagePay
        v-else-if='paymentGroup.type === PAYMENT_TYPES.Percentage'
        :price='itemPayments[payment.payerId]'
        :percentage='payment.percentage'
        @update:percentage='(newValue) => setPayerPercentage(payment.payerId, newValue)'
      />
    </td>
  </tr>
</template>

<script setup lang='ts'>
import type { Payer, Payment, PaymentGroup } from '@/interfaces'
import { computed, inject } from 'vue'
import { PAYMENT_TYPES } from '@/globals'
import DropdownSelect from '@/components/inputs/DropdownSelect.vue'
import ItemPrice from '@/components/ItemPrice.vue'
import ItemPricePerUnit from '@/components/ItemPricePerUnit.vue'
import EqualPay from '@/components/EqualPay.vue'
import QuantityPay from '@/components/QuantityPay.vue'
import PercentagePay from '@/components/PercentagePay.vue'
import { useItemsStore } from '@/store/itemsStore'

const paymentTypesMap = inject('paymentTypesMap', [])

const itemsStore = useItemsStore()

/* props */
const props = defineProps({
  id: { type: Number, required: true },
  name: { type: String, default: '' },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
  paymentGroup: { type: Object as () => PaymentGroup, required: true }
})

/* computed */
const pricePerUnit = computed((): number => {
  return props.price / props.quantity
})
const itemPayments = computed((): { [payerId: Payer['id']]: number } => {
  return itemsStore.paymentsMatrix[props.id]
})
const paymentGroupType = computed({
  get: () => props.paymentGroup.type,
  set: (value) => itemsStore.setPaymentType(props.id, value)
})

/* methods */
const setPayerIsEqualPayer = (payerId: Payer['id'], newValue: Payment['isEqualPayer']) => {
  itemsStore.setPaymentInGroup(props.id, payerId, { isEqualPayer: newValue })
}
const setPayerQuantity = (payerId: Payer['id'], newValue: Payment['quantity']) => {
  itemsStore.setPaymentInGroup(props.id, payerId, { quantity: newValue })
}
const setPayerPercentage = (payerId: Payer['id'], newValue: Payment['percentage']) => {
  itemsStore.setPaymentInGroup(props.id, payerId, { percentage: newValue })
}
</script>
