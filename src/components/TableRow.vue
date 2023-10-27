<template>
  <tr class='text-text tracking-wider py-8 border-b-2 border-primary border-opacity-30'>
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
        :selected-value='paymentGroup.type'
        @update:selected-item='setSelectedPaymentType'
      />
    </td>
    <td
      v-for='payment in paymentGroup.payments' :key='payment.payerId'
      class='text-center border-background border-2'
    >
      <EqualPay
        v-if='paymentGroup.type === PAYMENT_TYPES.Equal'
        :price='payingAmountMap[payment.payerId]'
        :is-equal-payer='payment.isEqualPayer'
        @click.prevent='setIsEqualPayer(!payment.isEqualPayer, payment.payerId)'
      />
      <QuantityPay
        v-else-if='paymentGroup.type === PAYMENT_TYPES.Quantity'
        :price='payingAmountMap[payment.payerId]'
        :quantity='payment.quantity'
        :max-quantity='quantity'
        @update:quantity='(newValue) => setPayerQuantity(newValue, payment.payerId)'
      />
      <PercentagePay
        v-else-if='paymentGroup.type === PAYMENT_TYPES.Percentage'
        :price='payingAmountMap[payment.payerId]'
        :percentage='payment.percentage'
        @update:percentage='(newValue) => setPayerPercentage(newValue, payment.payerId)'
      />
    </td>
  </tr>
</template>

<script setup lang='ts'>
import type { Item, Payer, Payment, PaymentGroup } from '@/interfaces'
import { computed, inject } from 'vue'
import { PAYMENT_TYPES } from '@/globals'
import { calculateEqualPayments, calculatePercentagePayments, calculateQuantityPayments } from '@/helpers'
import DropdownSelect from '@/components/inputs/DropdownSelect.vue'
import ItemPrice from '@/components/ItemPrice.vue'
import ItemPricePerUnit from '@/components/ItemPricePerUnit.vue'
import EqualPay from '@/components/EqualPay.vue'
import QuantityPay from '@/components/QuantityPay.vue'
import PercentagePay from '@/components/PercentagePay.vue'

const paymentTypesMap = inject('paymentTypesMap', [])

/* props */
const props = defineProps({
  id: { type: Number, required: true },
  name: { type: String, default: '' },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
  paymentGroup: { type: Object as () => PaymentGroup, required: true }
})

/* emits */
const emit = defineEmits<{
  'update:selected-payment-type': [payload: { itemId: Item['id'], newType: PAYMENT_TYPES }],
  'update:payer-is-equal': [payload: { itemId: Item['id'], payerId: Payer['id'], newValue: boolean }],
  'update:payer-quantity': [payload: { itemId: Item['id'], payerId: Payer['id'], newValue: number }],
  'update:payer-percentage': [payload: { itemId: Item['id'], payerId: Payer['id'], newValue: number }],
}>()

/* computed */
const pricePerUnit = computed((): number => {
  return props.price / props.quantity
})

// gets how much each user would be paying for the current item
type PayingAmountType = {
  [key in Payer['id']]: number;
}
const payingAmountMap = computed((): PayingAmountType => {
  let result: Record<Payment['payerId'], number> = {}

  switch (props.paymentGroup.type) {
    // divide for each payer equally
    case PAYMENT_TYPES.Equal: {
      result = calculateEqualPayments(props.price, props.paymentGroup.payments)
      break
    }

    // divide for each payer by the quantity they are paying for
    case PAYMENT_TYPES.Quantity: {
      result = calculateQuantityPayments(pricePerUnit.value, props.paymentGroup.payments)
      break
    }

    // divide for each payer by the percentage of the total price they are paying for
    case PAYMENT_TYPES.Percentage: {
      result = calculatePercentagePayments(props.price, props.paymentGroup.payments)
      break
    }

    default:
      throw new Error(`Unsupported payment type: ${props.paymentGroup.type}`)
  }

  return result
})

/* methods */
function setSelectedPaymentType(newValue: PAYMENT_TYPES) {
  emit('update:selected-payment-type', {
    newType: newValue,
    itemId: props.id
  })
}

function setIsEqualPayer(newValue: boolean, payerId: Payment['payerId']) {
  emit('update:payer-is-equal', {
    newValue: newValue,
    itemId: props.id,
    payerId: payerId,
  })
}

function setPayerQuantity(newValue: number, payerId: Payment['payerId']) {
  emit('update:payer-quantity', {
    newValue: newValue,
    itemId: props.id,
    payerId: payerId,
  })
}

function setPayerPercentage(newValue: number, payerId: Payment['payerId']) {
  emit('update:payer-percentage', {
    newValue: newValue,
    itemId: props.id,
    payerId: payerId,
  })
}
</script>
