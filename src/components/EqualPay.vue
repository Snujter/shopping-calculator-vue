<template>
  <AppButton class='w-full h-28' :no-background='price == 0'>
    <ToggleInput
      :is-checked='isEqualPayer'
    />
    <ItemPrice :price='price' :class='{"text-gray-600": price == 0}' />
  </AppButton>
<!--  <button-->
<!--    class='p-8 w-full bg-gradient-to-b hover:from-transparent hover:to-outline'-->
<!--    :class='[price > 0 ? "from-primary to-outline" : ""]'-->
<!--  >-->
<!--  </button>-->
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
