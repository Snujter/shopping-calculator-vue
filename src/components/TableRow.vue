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
        :price='store.getters.paymentForItemAndPayer(id, payment.payerId)'
        :is-equal-payer='payment.isEqualPayer'
        @click.prevent='store.commit(
          MutationTypes.UPDATE_PAYER_IS_EQUAL,
          {
            itemId: id,
            payerId: payment.payerId,
            value: !payment.isEqualPayer,
          }
        )'
      />
      <QuantityPay
        v-else-if='paymentGroup.type === PAYMENT_TYPES.Quantity'
        :price='store.getters.paymentForItemAndPayer(id, payment.payerId)'
        :quantity='payment.quantity'
        :max-quantity='quantity'
        @update:quantity='(newValue) => store.commit(
          MutationTypes.UPDATE_PAYER_QUANTITY,
          {
            itemId: id,
            payerId: payment.payerId,
            value: newValue,
          }
        )'
      />
      <PercentagePay
        v-else-if='paymentGroup.type === PAYMENT_TYPES.Percentage'
        :price='store.getters.paymentForItemAndPayer(id, payment.payerId)'
        :percentage='payment.percentage'
        @update:percentage='(newValue) => store.commit(
          MutationTypes.UPDATE_PAYER_PERCENTAGE,
          {
            itemId: id,
            payerId: payment.payerId,
            value: newValue,
          }
        )'
      />
    </td>
  </tr>
</template>

<script setup lang='ts'>
import type { PaymentGroup } from '@/interfaces'
import { computed, inject } from 'vue'
import { PAYMENT_TYPES } from '@/globals'
import DropdownSelect from '@/components/inputs/DropdownSelect.vue'
import ItemPrice from '@/components/ItemPrice.vue'
import ItemPricePerUnit from '@/components/ItemPricePerUnit.vue'
import EqualPay from '@/components/EqualPay.vue'
import QuantityPay from '@/components/QuantityPay.vue'
import PercentagePay from '@/components/PercentagePay.vue'
import { useStore } from 'vuex'
import { MutationTypes } from '@/store/mutations'

const paymentTypesMap = inject('paymentTypesMap', [])

const store = useStore()

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
const paymentGroupType = computed({
  get: () => props.paymentGroup.type,
  set: (value) => store.commit(
    MutationTypes.UPDATE_PAYMENT_TYPE,
    {
      itemId: props.id,
      value: value,
    }
  )
})
</script>
