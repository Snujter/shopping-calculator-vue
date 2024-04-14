<template>
  <div class='p-4' :class='activeStyle'>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

// variants
type VariantOptions = 'default' | 'error' | 'success'
const variantMap = {
  'default': 'bg-gray-950',
  'error': 'bg-red-950',
  'success': 'bg-green-950',
}

export default defineComponent({
  name: 'AppMessage',
  props: {
    variant: {
      type: String as () => VariantOptions,
      default: 'default',
      validator: (value: string): boolean => ['default', 'error', 'success'].includes(value)
    },
  },
  computed: {
    activeStyle() {
      return variantMap[this.variant]
    }
  }
})
</script>
