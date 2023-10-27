import { describe, it, expect, assert } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import NumberInput from '@/components/inputs/NumberInput.vue'

describe('NumberInput.vue', () => {
  it('has default prop values', () => {
    const wrapper = shallowMount(NumberInput)

    assert.equal(wrapper.props().value, 0, 'Default value is not 0')
    assert.equal(wrapper.props().max, undefined, 'Default max is not undefined')
    assert.equal(wrapper.props().min, 0, 'Default min is not 0')
    assert.equal(wrapper.props().step, 1, 'Default step is not 1')
  })

  it('input does not emit text values', async () => {
    const wrapper = shallowMount(NumberInput)
    const input = wrapper.find('input')

    await input.setValue('text') // this should be equivalent to NaN in the component
    expect(wrapper.emitted().input[0]).toEqual([0])
  })

  it('input respects min value', async () => {
    const wrapper = shallowMount(NumberInput, {
      props: {
        min: 5,
        step: 3
      }
    })

    // get elements
    const $input = wrapper.find('[data-test="input"]')

    // changing input value
    await $input.setValue('3')
    await wrapper.vm.$nextTick() // wait for click
    expect(wrapper.emitted().input[0]).toEqual([5])
  })

  it('input respects max value', async () => {
    const wrapper = shallowMount(NumberInput, {
      props: {
        step: 5,
        max: 10
      }
    })

    // get elements
    const $input = wrapper.find('[data-test="input"]')

    // changing input value
    await $input.setValue('12')
    await wrapper.vm.$nextTick() // wait for click
    expect(wrapper.emitted().input[0]).toEqual([10])
  })

  it('increase btn respects max value', async () => {
    const wrapper = shallowMount(NumberInput, {
      props: {
        value: 7,
        step: 2,
        max: 10
      }
    })

    // get elements
    const $increaseBtn = wrapper.find('[data-test="increase-btn"]')

    // trying to click on the increase btn
    await $increaseBtn.trigger('click')
    await wrapper.vm.$nextTick() // wait for click

    // should be 7 (value) + 2 (step) = 9
    expect(wrapper.emitted().input[0]).toEqual([9])

    // click on btn again
    await $increaseBtn.trigger('click')
    await wrapper.vm.$nextTick() // wait for click

    // should still be 9
    expect(wrapper.emitted().input[1]).toEqual([9])
  })

  it('decrease btn respects min value', async () => {
    const wrapper = shallowMount(NumberInput, {
      props: {
        value: 10,
        step: 2,
        min: 7
      }
    })

    // get elements
    const $decreaseBtn = wrapper.find('[data-test="decrease-btn"]')

    // trying to click on the increase btn
    await $decreaseBtn.trigger('click')
    await wrapper.vm.$nextTick() // wait for click

    // should be 10 (value) - 2 (step) = 8
    expect(wrapper.emitted().input[0]).toEqual([8])

    // click on btn again
    await $decreaseBtn.trigger('click')
    await wrapper.vm.$nextTick() // wait for click

    // should still be 8
    expect(wrapper.emitted().input[1]).toEqual([8])
  })
})
