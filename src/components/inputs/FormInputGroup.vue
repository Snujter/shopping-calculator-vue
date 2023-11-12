<template>
  <div class='flex flex-col mb-4'>
    <label
      class='text-text mb-1'
      :class='{"mb-1": $slots.label}'
    >
      <slot name='label'></slot>
    </label>
    <slot name='input'></slot>
  </div>
</template>
