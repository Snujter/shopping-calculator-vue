<template>
  <div class='text-xs text-gray-500 tracking-tight'>
    {{ formattedPrice }} per unit
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { formatPrice } from '@/helpers'

/* props */
const props = defineProps({
  price: { type: Number, required: true }
})

/* computed */
const formattedPrice = computed((): string => {
  return formatPrice(props.price)
})
</script>