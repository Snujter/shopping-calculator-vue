<template>
  <tr class='text-text tracking-wider border-b-2 border-primary border-opacity-30'>
    <!-- id -->
    <td class='text-right p-4 text-gray-500'>{{ id }}</td>
    <!-- name -->
    <td class='text-left p-4'>{{ name }}</td>
    <!-- quantity -->
    <td class='text-right p-4 text-xl tracking-normal'>{{ quantity }}</td>
    <!-- price -->
    <td class='text-right p-4 tracking-normal'>
      <ItemPrice :price='price' />
      <ItemPrice :price='pricePerUnit' font-size='small' color='faded'>
        <template #suffix>per unit</template>
      </ItemPrice>
    </td>
    <!-- payment type -->
    <td class='text-center px-4 py-2'>
      <DropdownSelect
        v-model='paymentGroupType'
        :items='paymentTypesMap'
      />
    </td>
    <!-- payment for each payer -->
    <td
      v-for='payment in paymentGroup.payments' :key='payment.payerId'
      class='text-center'
    >
      <EqualPay
        v-if='paymentGroup.type === PaymentTypes.EQUAL'
        :price='itemPayments[payment.payerId]'
        :is-equal-payer='payment.isEqualPayer'
        @click.prevent='() => itemsStore.setPaymentIsEqualPayer(id, payment.payerId, !payment.isEqualPayer)'
      />
      <QuantityPay
        v-else-if='paymentGroup.type === PaymentTypes.QUANTITY'
        :price='itemPayments[payment.payerId]'
        :quantity='payment.quantity'
        :max-quantity='quantity'
        @update:quantity='(newValue) => itemsStore.setPaymentQuantity(id, payment.payerId, newValue)'
      />
      <PercentagePay
        v-else-if='paymentGroup.type === PaymentTypes.PERCENTAGE'
        :price='itemPayments[payment.payerId]'
        :percentage='payment.percentage'
        @update:percentage='(newValue) => itemsStore.setPaymentPercentage(id, payment.payerId, newValue)'
      />
    </td>
  </tr>
</template>

<script setup lang='ts'>
import type { Payer, PaymentGroup } from '@/interfaces'
import { computed, inject } from 'vue'
import { PaymentTypes } from '@/globals'
import DropdownSelect from '@/components/inputs/DropdownSelect.vue'
import ItemPrice from '@/components/ItemPrice.vue'
import EqualPay from '@/components/paymentTable/EqualPay.vue'
import QuantityPay from '@/components/paymentTable/QuantityPay.vue'
import PercentagePay from '@/components/paymentTable/PercentagePay.vue'
import { useItemsStore } from '@/store/itemsStore'

// available payment types
const paymentTypesMap = inject('paymentTypesMap', [])

// items store
const itemsStore = useItemsStore()

/* props */
const props = defineProps({
  id: { type: Number, required: true },
  name: { type: String, default: '' },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
  paymentGroup: { type: Object as () => PaymentGroup, required: true }
})

// price per unit
const pricePerUnit = computed((): number => {
  return props.price / props.quantity
})

// payments for the item, mapped by payer id
const itemPayments = computed((): { [payerId: Payer['id']]: number } => {
  return itemsStore.paymentsMatrix[props.id]
})

// get / set payment type
const paymentGroupType = computed({
  get: () => props.paymentGroup.type,
  set: (value) => itemsStore.setPaymentType(props.id, value)
})
</script>
