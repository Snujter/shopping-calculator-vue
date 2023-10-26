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
    <td class='text-center px-4 py-2' v-for='payer in payment.payers' :key='payer.id'>
      <!--      <EqualShareInput :payer-id='payer.id' :is-paying='payer.isPaying' />-->
      {{ payer }}
      ----------
      {{ payingAmountMap }}
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
</script>
