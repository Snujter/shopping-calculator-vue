<template>
  <button
    class='p-8 w-full'
    :class='[price > 0 ? "bg-opacity-30 bg-primary hover:bg-opacity-60" : "hover:bg-gray-600 hover:bg-opacity-5"]'
  >
    <ToggleInput
      :is-checked='isEqualPayer'
    />
    <ItemPrice :price='price' :class='{"text-gray-600": price == 0}' />
  </button>
</template>

<script setup lang='ts'>
import ToggleInput from '@/components/inputs/ToggleInput.vue'
import ItemPrice from '@/components/ItemPrice.vue'

defineProps({
  price: { type: Number, default: 0 },
  isEqualPayer: { type: Boolean, default: false }
})
</script>
