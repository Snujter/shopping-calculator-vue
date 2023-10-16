<template>
  <div>
    <input type='radio'>
    <input type='radio'>
  </div>
</template>

<script lang='ts' setup>
import type { DefineComponent } from 'vue'
import { ref, computed } from 'vue'

// interfaces
interface DropdownItem {
  value: string;
  label: string;
  icon: DefineComponent<{}, {}, any>
}

// props
const props = defineProps({
})
// emits
const emit = defineEmits(['update:selectedItem'])

// data
const isOpen = ref(false)

// methods
function closeDropdown() {
  console.log('closing dropdown')
  isOpen.value = false
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleSelectedItem(newValue: string) {
  emit('update:selectedItem', newValue)
  closeDropdown()
}

// computed
const selectedItem = computed(() => {
  return props.items.find((item) => item.value === props.selectedValue)
    || props.items[0]
})
</script>
