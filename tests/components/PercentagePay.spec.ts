import { describe, it, expect, assert } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import PercentagePay from '../../src/components/PercentagePay.vue'

describe('PercentagePay.vue', () => {
  it('has default prop values', () => {
    const wrapper = shallowMount(PercentagePay)

    assert.equal(wrapper.props().price, 0, 'Default price is not 0')
    assert.equal(wrapper.props().percentage, 0, 'Default percentage is not 0')
  })

  it('emits events', async () => {
    const wrapper = shallowMount(PercentagePay)

    // events to emit
    wrapper.vm.$emit('update:percentage', 3)

    // wait until emitted
    await wrapper.vm.$nextTick()

    // check if emitted values are correct
    expect(wrapper.emitted('update:percentage')?.[0]).toStrictEqual([3])
  })
})
