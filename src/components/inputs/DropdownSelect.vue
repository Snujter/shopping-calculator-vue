<template>
  <div class='relative' v-click-outside='closeDropdown'>
    <button
      type='button'
      class='
        transition-all bg-background text-text border-2 p-4 active:border-accent
        w-full inline-flex items-center
        group
      '
      :class='[isOpen ? "border-accent" : "border-outline"]'
      @click='toggleDropdown'
      data-test='toggle'
    >
      <!-- selected item icon -->
      <component
        :is='(selectedItem && selectedItem.icon) || ""'
        class='group-active:bg-accent transition-all mr-4 p-1 rounded-full fill-text'
        :class='[isOpen ? "bg-accent" : "bg-outline"]' />
      <!-- selected item label -->
      <span class='mr-4'>{{ (selectedItem && selectedItem.label) || "" }}</span>
      <!-- dropdown arrow -->
      <IconArrow
        class='group-active:stroke-accent transition-all ml-auto'
        :class='[isOpen ? "stroke-accent rotate-180" : "stroke-text"]'
      />
    </button>

    <!-- dropdown menu -->
    <div
      class='grid absolute z-20 bg-primary text-left text-text transition-all w-full'
      :class='[isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"]'
      data-test='item-list-container'
    >
      <ul class='overflow-hidden'>
        <li v-for='item in items' :key='item.value'>
          <a
            href='#'
            class='flex p-4 hover:bg-accent group'
            @click='handleSelectedItem(item.value)'
            data-test='item'
          >
            <!-- icon -->
            <component
              v-if='item.icon'
              :is='item.icon'
              class='rounded-full fill-text p-1 mr-4 group-hover:bg-background w-6 h-6'
              :class='[item === selectedItem ? "bg-accent" : "bg-outline"]'
            />
            <!-- item label -->
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { DefineComponent } from 'vue'
import { ref, computed } from 'vue'
import IconArrow from '@/components/icons/IconArrow.vue'

/* interfaces */
interface DropdownItem {
  value: string | number
  label: string
  icon?: DefineComponent<{}, {}, any>
}

/* props */
const props = defineProps({
  items: { type: Array<DropdownItem>, required: true },
  modelValue: {
    type: [String, Number],
    default(rawProps: { items: Array<DropdownItem> }) {
      // value of the first item should be the default
      return rawProps.items[0]?.value
    }
  }
})

/* emits */
const emit = defineEmits(['update:modelValue'])

/* data */
const isOpen = ref(false)

/* methods */
const closeDropdown = (): void => {
  isOpen.value = false
}
const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value
}
const handleSelectedItem = (newValue: DropdownItem['value']): true => {
  emit('update:modelValue', newValue)
  closeDropdown()
  return true
}

/* computed */
const selectedItem = computed((): DropdownItem | undefined => {
  return props.items.find((item) => item.value === props.modelValue)
})
</script>
