<template>
  <div class='flex flex-col p-8'>
    <NumberInput class='mb-2' :value='percentage' @input='handlePercentageChange' :max=100 />
    <ItemPrice :price='price' :class='{"text-gray-600": price == 0}' />
  </div>
</template>

<script setup lang='ts'>
import ItemPrice from '@/components/ItemPrice.vue'
import NumberInput from '@/components/inputs/NumberInput.vue'

defineProps({
  price: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
})

const emit = defineEmits(['update:percentage'])

const handlePercentageChange = (newValue: number) => {
  emit('update:percentage', newValue)
}
</script>
