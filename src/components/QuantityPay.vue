<template>
  <div
    class='flex flex-col p-8'
  >
    <NumberInput class='mb-2' :value='quantity' @input='handleQuantityChange' :max='maxQuantity' />
    <ItemPrice :price='price' :class='{"text-gray-600": price == 0}' />
  </div>
</template>
<script setup lang='ts'>
import ItemPrice from '@/components/ItemPrice.vue'
import NumberInput from '@/components/inputs/NumberInput.vue'

defineProps({
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  maxQuantity: { type: Number, default: undefined },
})

const emit = defineEmits(['update:quantity'])

const handleQuantityChange = (newValue: number) => {
  emit('update:quantity', newValue)
}
</script>
