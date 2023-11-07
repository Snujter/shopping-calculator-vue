<template>
  <TableFrame
    :stick-to='ALIGNMENT.Top'
    container-element='th'
    :no-background='noBackground'
  >
    <slot />
  </TableFrame>
</template>

<script setup lang='ts'>
import { ALIGNMENT } from '@/globals'
import TableFrame from '@/components/TableFrame.vue'

defineProps({
  noBackground: { type: Boolean, default: false }
})
</script>
