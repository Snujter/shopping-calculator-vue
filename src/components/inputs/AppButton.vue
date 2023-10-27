<template>
  <button
    class='flex items-center bg-outline p-2 group'
    :disabled='disabled'
    :class='{"bg-opacity-10 cursor-not-allowed": disabled}'
    data-test='button'
  >
    <!-- icon container -->
    <span
      class='p-1'
      :class='[
        [disabled ? "fill-gray-600" : "fill-text"], /* disabled styles */
      ]'
    >
      <slot name='leading-icon'></slot>
    </span>
    <span :class='{"px-3": $slots.default}'>
      <slot><!-- button text --></slot>
    </span>
  </button>
</template>

<script setup lang='ts'>
/* props */
defineProps({
  disabled: { type: Boolean, default: false },
})
</script>
