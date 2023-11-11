<template>
  <label class='relative inline-flex items-center cursor-pointer'>
    <input
      type='checkbox'
      class='sr-only peer'
      :checked='isChecked'
      @change='handleChange'
      data-test='checkbox'
    >
    <span
      class="
        peer w-14 h-7 rounded-full
        peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent
        bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white
        after:content-[''] after:absolute after:top-0.5 after:left-[4px]
        after:bg-white after:border-gray-700 after:border after:rounded-full
        after:h-6 after:w-6
        after:transition-all peer-checked:bg-blue-600"
    />
  </label>
</template>

<script setup lang='ts'>
/* props */
defineProps({
  isChecked: { type: Boolean, default: false }
})

/* emits */
const emit = defineEmits(['update:is-checked'])

/* methods */
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target) {
    emit('update:is-checked', target.checked)
  }
}
</script>
