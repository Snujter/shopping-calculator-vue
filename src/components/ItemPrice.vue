<template>
  <div class='text-xl tracking-tight'>
    {{ formattedPrice }}
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