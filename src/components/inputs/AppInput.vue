<template>
  <input
    class='
      peer
      h-full w-full p-4
      border-2 border-outline bg-background text-white
      placeholder-transparent focus:outline-none focus:border-accent
    '
    :value='modelValue'
    @input='updateValue'
    v-bind="$attrs"
    data-test='input'
  />
</template>

<script setup lang='ts'>
/* props */
defineProps({
  modelValue: { type: String, default: '' }
})

/* emits */
const emit = defineEmits(['update:modelValue'])

/* methods */
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  let newValue = target.value
  emit('update:modelValue', newValue)
}
</script>
