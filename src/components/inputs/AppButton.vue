<template>
  <button
    class='flex items-center justify-center p-2 group'
    :disabled='disabled'
    :class='[
      [disabled ? "cursor-not-allowed" : "from-accent to-outline"],
      [noBackground ? "" : "bg-gradient-to-br"]
    ]'
    data-test='button'
  >
    <!-- icon container -->
    <span
      :class='[
        [disabled ? "fill-gray-600" : "fill-text"], /* disabled styles */
        {"p-1": $slots["leading-icon"]}
      ]'
    >
      <slot name='leading-icon'></slot>
    </span>
    <span :class='{"px-2 text-text": $slots.default}'>
      <slot><!-- button text --></slot>
    </span>
  </button>
</template>

<script setup lang='ts'>
/* props */
defineProps({
  disabled: { type: Boolean, default: false },
  noBackground: { type: Boolean, default: false }
})
</script>
