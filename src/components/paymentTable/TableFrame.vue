<template>
  <component
    :is='containerElement'
    class='
      sticky z-10
      p-3 tracking-widest font-normal
      text-text
    '
    :class='[
      [noBackground ? "bg-background" : "bg-gradient-to-br from-primary to-outline"],
      {
        "top-0": stickTo === Alignment.TOP,
        "bottom-0": stickTo === Alignment.BOTTOM
      },
    ]'
  >
    <slot />
  </component>
</template>

<script setup lang='ts'>
import { Alignment } from '@/globals'

defineProps({
  noBackground: { type: Boolean, default: false },
  containerElement: { type: String, required: true },
  stickTo: {
    type: Number as () => Alignment,
    validator: (value: any): boolean => {
      return value === Alignment.TOP || value === Alignment.BOTTOM
    },
    required: true
  }
})
</script>
