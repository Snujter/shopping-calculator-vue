<template>
  <div class='tracking-tight' :class='activeStyle'>
    <!-- prefix slot -->
    <slot name='prefix'></slot>

    <!-- main content (price) -->
    {{ formattedPrice }}

    <!-- suffix slot -->
    <slot name='suffix'></slot>
  </div>
</template>

<script lang='ts'>
import { formatPrice } from '@/helpers'
import { defineComponent } from 'vue'

// font sizes
type FontSizeOptions = 'large' | 'small'
const fontSizeMap = {
  'large': 'text-xl',
  'small': 'text-xs',
}

// colors
type ColorOptions = 'default' | 'faded'
const colorMap = {
  'default': '',
  'faded': 'text-gray-500',
}

export default defineComponent({
  name: 'ItemPrice',
  props: {
    price: { type: Number, required: true },
    fontSize: {
      type: String as () => FontSizeOptions,
      default: 'large',
      validator: (value: string): boolean => ['large', 'small'].includes(value)
    },
    color: {
      type: String as () => ColorOptions,
      default: 'default',
      validator: (value: string): boolean => ['default', 'faded'].includes(value)
    },
  },
  computed: {
    activeStyle() {
      return [colorMap[this.color], fontSizeMap[this.fontSize]].filter(n => n).join(' ')
    },
    formattedPrice() {
      return formatPrice(this.price)
    }
  }
})
</script>
