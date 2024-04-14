<template>
  <AppButton class='w-full h-28' :no-background='price == 0'>
    <ToggleInput
      :is-checked='isEqualPayer'
    />
    <ItemPrice :price='price' :color='price <= 0 ? "faded" : "default"' />
  </AppButton>
</template>

<script setup lang='ts'>
import ToggleInput from '@/components/inputs/ToggleInput.vue'
import ItemPrice from '@/components/ItemPrice.vue'
import AppButton from '@/components/inputs/AppButton.vue'

defineProps({
  price: { type: Number, default: 0 },
  isEqualPayer: { type: Boolean, default: false }
})
</script>
