import { describe, it, expect, assert } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import ToggleInput from '../../../src/components/inputs/ToggleInput.vue'

describe('ToggleInput.vue', () => {
  it('has default prop values', () => {
    const wrapper = shallowMount(ToggleInput)

    assert.equal(wrapper.props().isChecked, false, 'Default isChecked is not false')
  })

  it('renders button as disabled when prop is true', () => {
    const wrapper = shallowMount(ToggleInput, {
      props: {
        isChecked: true
      }
    })

    const $checkbox = wrapper.find('[data-test="checkbox"]').element as HTMLInputElement
    expect($checkbox.checked).toBe(true)
  })

  it('renders button as not disabled when prop is false', () => {
    const wrapper = shallowMount(ToggleInput, {
      props: {
        isChecked: false
      }
    })
    const $checkbox = wrapper.find('[data-test="checkbox"]').element as HTMLInputElement
    expect($checkbox.checked).toBe(false)
  })

  it('emits events', async () => {
    const wrapper = shallowMount(ToggleInput)

    // events to emit
    wrapper.vm.$emit('update:is-checked', true)

    // wait until emitted
    await wrapper.vm.$nextTick()

    // check if emitted values are correct
    expect(wrapper.emitted('update:is-checked')?.[0]).toStrictEqual([true])
  })
})
