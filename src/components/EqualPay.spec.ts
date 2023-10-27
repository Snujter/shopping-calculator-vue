import { describe, it, assert } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import ToggleInput from '@/components/EqualPay.vue'

describe('ToggleInput.vue', () => {
  it('has default prop values', () => {
    const wrapper = shallowMount(ToggleInput)

    assert.equal(wrapper.props().price, 0, 'Default price is not 0')
    assert.equal(wrapper.props().isEqualPayer, false, 'Default isEqualPayer is not false')
  })
})
