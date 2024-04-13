import { describe, it, expect, assert } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import QuantityPay from '../../src/components/QuantityPay.vue'

describe('QuantityPay.vue', () => {
  it('has default prop values', () => {
    const wrapper = shallowMount(QuantityPay)

    assert.equal(wrapper.props().price, 0, 'Default price is not 0')
    assert.equal(wrapper.props().quantity, 0, 'Default quantity is not 0')
    assert.equal(wrapper.props().maxQuantity, undefined, 'Default maxQuantity is not undefined')
  })

  it('emits events', async () => {
    const wrapper = shallowMount(QuantityPay)

    // events to emit
    wrapper.vm.$emit('update:quantity', 3)

    // wait until emitted
    await wrapper.vm.$nextTick()

    // check if emitted values are correct
    expect(wrapper.emitted('update:quantity')?.[0]).toStrictEqual([3])
  })
})
