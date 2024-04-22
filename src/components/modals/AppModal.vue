<template>
  <div
    v-if='isOpen'
    class='
      fixed z-40 inset-0
      bg-background bg-opacity-90
      overflow-y-auto h-full w-full
      flex justify-center items-center
    '
  >
    <div class='bg-primary-dark text-text p-8 shadow-lg w-96'>
      <header class='flex justify-between items-center'>
        <h2 class='text-xl font-semibold'>
          <slot name='header' />
        </h2>
        <button @click='closeModal' class='text-gray-700 hover:text-accent'>
          <span class='text-2xl'>&times;</span>
        </button>
      </header>
      <section class='my-8'>
        <slot />
      </section>
      <footer class='flex justify-end'>
        <slot name='footer'>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'

/* props */
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

/* emits */
const emit = defineEmits(['update:modelValue'])

/* data */
const isOpen = ref(props.modelValue)

/* watch */
watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue
})

/* methods */
const closeModal = () => {
  isOpen.value = false
  emit('update:modelValue', false)
}
</script>
