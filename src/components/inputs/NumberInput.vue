<template>
  <div class='flex items-stretch'>
    <AppButton
      :disabled='!canDecreaseValue'
      @click='subtractStepFromValue'
      data-test='decrease-btn'
    >
      <template #leading-icon>
        <IconMinus />
      </template>
    </AppButton>
    <input
      type='number'
      :value='value'
      :min='min'
      :max='max'
      @input='handleInput'
      class='
        w-full text-center text-2xl
        bg-background border-2 border-outline
        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
      '
      data-test='input'
    />
    <AppButton
      :disabled='!canIncreaseValue'
      @click='addStepToValue'
      data-test='increase-btn'
    >
      <template #leading-icon>
        <IconPlus />
      </template>
    </AppButton>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import AppButton from '@/components/inputs/AppButton.vue'

/* props */
const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: undefined },
  min: { type: Number, default: 0 },
  step: { type: Number, default: 1 }
})

/* emits */
const emit = defineEmits(['input'])

/* computed */
const canDecreaseValue = computed((): boolean => {
  return props.value > props.min
})
const canIncreaseValue = computed((): boolean => {
  if (props.max === undefined) {
    return true
  }
  return props.value < props.max
})

/* methods */
const updateValue = (newValue: number) => {
  if (isNaN(newValue) || newValue < props.min) {
    emit('input', props.min)
    return
  }

  if (props.max !== undefined && newValue > props.max) {
    emit('input', props.max)
    return
  }

  emit('input', newValue)
}
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)
  updateValue(value)
}
const addStepToValue = () => {
  if (!canIncreaseValue.value) {
    return
  }
  const newValue = props.value + props.step
  updateValue(newValue)
}
const subtractStepFromValue = () => {
  if (!canDecreaseValue.value) {
    return
  }
  const newValue = props.value - props.step
  updateValue(newValue)
}
</script>
