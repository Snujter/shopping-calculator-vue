<template>
  <TableFrame
    :stick-to='Alignment.TOP'
    container-element='th'
    :no-background='noBackground'
  >
    <slot />
  </TableFrame>
</template>

<script setup lang='ts'>
import { Alignment } from '@/globals'
import TableFrame from '@/components/paymentTable/TableFrame.vue'

defineProps({
  noBackground: { type: Boolean, default: false }
})
</script>
