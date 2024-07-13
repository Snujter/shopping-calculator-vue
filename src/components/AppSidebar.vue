<template>
  <aside
    class='
      absolute z-30 flex flex-col
      p-2 w-14 hover:w-64 h-full
      transition-all duration-300 ease-in-out
      bg-background border-r-2 border-outline text-white
    '
  >
    <div v-for='(group, index) in menuGroups' :key='index' class='my-2'>
      <hr v-if='index !== 0' class='mb-4 border-gray-700' />
      <ul>
        <li
          v-for='item in group'
          :key='item.id'
          @click='item.onClick'
          class='left-0 flex items-center p-2 hover:bg-accent cursor-pointer overflow-hidden'
        >
          <div class='mr-2'>
            <component :is='item.icon' class='w-6 h-6 min-w-fit fill-text' />
          </div>
          <span class='text ml-2 truncate'>{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang='ts'>
import type { PropType, DefineComponent } from 'vue'

defineProps({
  menuGroups: {
    type: Array as PropType<Array<Array<{
      id: number;
      icon: DefineComponent<{}, {}, any>;
      text: string;
      onClick: () => void
    }>>>,
    required: true
  }
})
</script>
