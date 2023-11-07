<template>
  <component
    :is='containerElement'
    class='
      sticky z-10
      px-4 py-4 tracking-widest font-normal
      text-text
    '
    :class='[
      [noBackground ? "bg-background" : "bg-gradient-to-br from-primary to-outline"],
      {
        "top-0": stickTo === ALIGNMENT.Top,
        "bottom-0": stickTo === ALIGNMENT.Bottom
      },
    ]'
  >
    <slot />
  </component>
</template>

<script setup lang='ts'>
import { ALIGNMENT } from '@/globals'

defineProps({
  noBackground: { type: Boolean, default: false },
  containerElement: { type: String, required: true },
  stickTo: {
    type: Number as () => ALIGNMENT,
    validator: (value: any): boolean => {
      return value === ALIGNMENT.Top || value === ALIGNMENT.Bottom
    },
    required: true
  }
})
</script>
